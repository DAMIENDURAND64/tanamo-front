from __future__ import annotations

import asyncio
import threading
import time
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional

from extranatapi.cotation import COTATION_DAMES, COTATION_MESSIEURS, COTATION_MIXTE
from extranatapi.wrapper import Wrapper


@dataclass
class _CacheEntry:
    value: Any
    expires_at: float


class ExtranatService:
    """Adapter entre FastAPI et extranatapi."""

    def __init__(self, cache_ttl_seconds: int = 3600) -> None:
        self._wrapper = Wrapper()
        self._cache_ttl = cache_ttl_seconds
        self._cache: Dict[str, _CacheEntry] = {}
        self._cache_lock = threading.Lock()

    # ------------------------------------------------------------------
    # Public API (async pour FastAPI)
    # ------------------------------------------------------------------
    async def get_regions(self) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_regions_sync)

    async def get_departements(self, region_id: Optional[str] = None) -> List[Dict[str, Any]]:
        departements = await asyncio.to_thread(self._get_departements_sync)
        if region_id is not None:
            region_id = str(region_id)
            departements = [
                item for item in departements if item.get("region", {}).get("idreg") == region_id
            ]
        return departements

    async def get_clubs(
        self,
        region_id: Optional[str] = None,
        departement_id: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        clubs = await asyncio.to_thread(self._get_clubs_sync)
        if region_id is not None:
            region_id = str(region_id)
            clubs = [
                item
                for item in clubs
                if item.get("departement", {}).get("region", {}).get("idreg") == region_id
            ]
        if departement_id is not None:
            departement_id = str(departement_id)
            clubs = [
                item
                for item in clubs
                if item.get("departement", {}).get("iddep") == departement_id
            ]
        return clubs

    async def get_nageur(self, iuf: str, include_all: bool = False) -> Dict[str, Any]:
        func = self._wrapper.get_nageur_all if include_all else self._wrapper.get_nageur_mpp
        nageur = await asyncio.to_thread(func, iuf)
        if nageur is None:
            raise ValueError(f"Nageur {iuf} introuvable")
        return self._serialize_nageur(nageur)

    async def get_club_season(self, club_id: str, season_year: str) -> Dict[str, Any]:
        return await asyncio.to_thread(self._get_club_season_sync, club_id, season_year)

    async def get_club_season_performances(
        self, club_id: str, season_year: str
    ) -> Dict[str, Any]:
        """Récupère les performances groupées par nage et sexe."""
        return await asyncio.to_thread(
            self._get_club_season_performances_sync, club_id, season_year
        )

    async def list_nages(self) -> List[str]:
        return self._cached("nages", self._build_nages, ttl=24 * 3600)

    def clear_cache(self) -> None:
        with self._cache_lock:
            self._cache.clear()

    # ------------------------------------------------------------------
    # Sync helpers (exécutés dans des threads par asyncio.to_thread)
    # ------------------------------------------------------------------
    def _get_regions_sync(self) -> List[Dict[str, Any]]:
        return self._cached("regions", self._fetch_regions)

    def _get_departements_sync(self) -> List[Dict[str, Any]]:
        return self._cached("departements", self._fetch_departements)

    def _get_clubs_sync(self) -> List[Dict[str, Any]]:
        # Les clubs forment un gros corpus -> TTL un peu plus long
        return self._cached("clubs", self._fetch_clubs, ttl=6 * 3600)

    def _get_club_season_sync(self, club_id: str, season_year: str) -> Dict[str, Any]:
        cache_key = f"season:{club_id}:{season_year}"
        return self._cached(cache_key, lambda: self._fetch_club_season(club_id, season_year))

    def _get_club_season_performances_sync(
        self, club_id: str, season_year: str
    ) -> Dict[str, Any]:
        cache_key = f"season_perfs:{club_id}:{season_year}"
        return self._cached(
            cache_key, lambda: self._fetch_club_season_performances(club_id, season_year)
        )

    # ------------------------------------------------------------------
    # Cache
    # ------------------------------------------------------------------
    def _cached(self, key: str, producer: Callable[[], Any], ttl: Optional[int] = None) -> Any:
        now = time.time()
        with self._cache_lock:
            entry = self._cache.get(key)
            if entry and entry.expires_at > now:
                return entry.value

        value = producer()
        expires_at = now + (ttl if ttl is not None else self._cache_ttl)
        with self._cache_lock:
            self._cache[key] = _CacheEntry(value=value, expires_at=expires_at)
        return value

    # ------------------------------------------------------------------
    # Fetchers
    # ------------------------------------------------------------------
    def _fetch_regions(self) -> List[Dict[str, Any]]:
        regions = self._wrapper.get_regions()
        return [self._serialize_region(item) for item in regions]

    def _fetch_departements(self) -> List[Dict[str, Any]]:
        departements = self._wrapper.get_departements()
        return [self._serialize_departement(item) for item in departements]

    def _fetch_clubs(self) -> List[Dict[str, Any]]:
        clubs = self._wrapper.get_clubs()
        return [self._serialize_club(item) for item in clubs]

    def _fetch_club_season(self, club_id: str, season_year: str) -> Dict[str, Any]:
        season = self._wrapper.get_saison(idclub=club_id, annee=season_year)
        return self._serialize_saison(season)

    @staticmethod
    def _normalize_nage_name(nage_name: str) -> str:
        """Normalise le nom de la nage pour correspondre au format FFN."""
        # Mapping des noms abrégés vers les noms complets FFN
        nage_map = {
            'NL': 'NAGE LIBRE',
            'Dos': 'DOS',
            'Bra.': 'BRASSE',
            'Pap.': 'PAPILLON',
            '4 N.': '4 NAGES',
        }
        
        # Remplacer les abréviations par les noms complets
        for abbrev, full_name in nage_map.items():
            if abbrev in nage_name:
                nage_name = nage_name.replace(abbrev, full_name)
        
        return nage_name.upper()
    
    def _fetch_club_season_performances(self, club_id: str, season_year: str) -> Dict[str, Any]:
        """Récupère les meilleures performances par nage pour chaque nageur."""
        season = self._wrapper.get_saison(idclub=club_id, annee=season_year)
        season_data = season.to_json_data()
        
        # Dictionnaire pour stocker la meilleure perf de chaque nageur par nage
        # Structure: {nage_name: {sexe: {iuf: perf_data}}}
        best_performances: Dict[str, Dict[str, Dict[str, Dict[str, Any]]]] = {}
        
        for comp in season_data.get('competitions', []):
            comp_name = comp.get('name', 'Inconnu')
            comp_date = comp.get('date', '')
            
            for nageur in comp.get('nageurs', []):
                sexe = nageur.get('sexe', 'M')
                iuf = nageur.get('iuf', 'na')
                nageur_name = nageur.get('name', 'Inconnu')
                yearofbirth = nageur.get('yearofbirth', 'na')
                
                for nage in nageur.get('nages', []):
                    nage_name = self._normalize_nage_name(nage.get('name', 'Inconnu'))
                    temps = nage.get('temps', 'N/A')
                    
                    # Initialiser la structure si nécessaire
                    if nage_name not in best_performances:
                        best_performances[nage_name] = {'M': {}, 'F': {}}
                    if sexe not in best_performances[nage_name]:
                        best_performances[nage_name][sexe] = {}
                    
                    perf_data = {
                        'nageur': nageur_name,
                        'temps': temps,
                        'classement': nage.get('classement', 'N/A'),
                        'competition': comp_name,
                        'date': comp_date,
                        'iuf': iuf,
                        'yearofbirth': yearofbirth,
                    }
                    
                    # Ne garder que la meilleure performance (temps le plus petit)
                    if iuf not in best_performances[nage_name][sexe]:
                        best_performances[nage_name][sexe][iuf] = perf_data
                    else:
                        # Comparer les temps (format: "00:28.94" ou "01:02.45")
                        existing_time = best_performances[nage_name][sexe][iuf]['temps']
                        if self._compare_times(temps, existing_time) < 0:
                            best_performances[nage_name][sexe][iuf] = perf_data
        
        # Convertir en listes et trier par temps
        all_performances: Dict[str, Dict[str, List[Dict[str, Any]]]] = {}
        for nage_name, sexes in best_performances.items():
            all_performances[nage_name] = {}
            for sexe, nageurs_dict in sexes.items():
                perfs_list = list(nageurs_dict.values())
                # Trier par temps (le plus rapide en premier)
                perfs_list.sort(key=lambda p: self._time_to_seconds(p['temps']))
                all_performances[nage_name][sexe] = perfs_list
        
        return {
            'saison': season_year,
            'club_id': club_id,
            'performances_by_nage': all_performances,
        }
    
    @staticmethod
    def _time_to_seconds(time_str: str) -> float:
        """Convertit un temps au format 'MM:SS.CS' ou 'HH:MM:SS.CS' en secondes."""
        try:
            parts = time_str.split(':')
            if len(parts) == 2:
                # Format MM:SS.CS
                minutes, seconds = parts
                return float(minutes) * 60 + float(seconds)
            elif len(parts) == 3:
                # Format HH:MM:SS.CS
                hours, minutes, seconds = parts
                return float(hours) * 3600 + float(minutes) * 60 + float(seconds)
            else:
                return float('inf')  # Temps invalide, mettre à la fin
        except (ValueError, AttributeError):
            return float('inf')
    
    @staticmethod
    def _compare_times(time1: str, time2: str) -> int:
        """Compare deux temps. Retourne -1 si time1 < time2, 0 si égaux, 1 si time1 > time2."""
        seconds1 = ExtranatService._time_to_seconds(time1)
        seconds2 = ExtranatService._time_to_seconds(time2)
        if seconds1 < seconds2:
            return -1
        elif seconds1 > seconds2:
            return 1
        return 0

    def _build_nages(self) -> List[str]:
        nages = set()
        nages.update(COTATION_DAMES.values())
        nages.update(COTATION_MESSIEURS.values())
        nages.update(COTATION_MIXTE.values())
        return sorted(nages)

    # ------------------------------------------------------------------
    # Serialisation helpers
    # ------------------------------------------------------------------
    @staticmethod
    def _serialize_region(region: Any) -> Dict[str, Any]:
        return {
            "idreg": getattr(region, "idreg", None),
            "idstruct": getattr(region, "idstruct", None),
            "name": getattr(region, "name", None),
        }

    def _serialize_departement(self, departement: Any) -> Dict[str, Any]:
        region = getattr(departement, "region", None)
        return {
            "iddep": getattr(departement, "iddep", None),
            "idstruct": getattr(departement, "idstruct", None),
            "name": getattr(departement, "name", None),
            "region": self._serialize_region(region) if region is not None else None,
        }

    def _serialize_club(self, club: Any) -> Dict[str, Any]:
        departement = getattr(club, "departement", None)
        return {
            "idclub": getattr(club, "idclub", None),
            "name": getattr(club, "name", None),
            "departement": self._serialize_departement(departement) if departement is not None else None,
        }

    def _serialize_nage(self, nage: Any) -> Dict[str, Any]:
        return {
            "name": getattr(nage, "name", None),
            "classement": getattr(nage, "classement", None),
            "temps": getattr(nage, "temps", None),
            "points": getattr(nage, "points", None),
            "bassin": getattr(nage, "bassin", None),
            "date": getattr(nage, "date", None),
        }

    def _serialize_nageur(self, nageur: Any) -> Dict[str, Any]:
        nages_attr = getattr(nageur, "nages", [])
        if callable(nages_attr):
            nages_iterable = nages_attr()
        else:
            nages_iterable = nages_attr
        return {
            "name": getattr(nageur, "name", None),
            "sexe": getattr(nageur, "sexe", None),
            "yearofbirth": getattr(nageur, "yearofbirth", None),
            "age": getattr(nageur, "age", None),
            "iuf": getattr(nageur, "iuf", None),
            "nationality": getattr(nageur, "nationality", None),
            "nages": [self._serialize_nage(item) for item in nages_iterable],
        }

    def _serialize_competition(self, competition: Any) -> Dict[str, Any]:
        nageurs_attr = getattr(competition, "nageurs", [])
        if callable(nageurs_attr):
            nageurs_iterable = nageurs_attr()
        else:
            nageurs_iterable = nageurs_attr
        return {
            "idcpt": getattr(competition, "idcpt", None),
            "name": getattr(competition, "name", None),
            "date": getattr(competition, "date", None),
            "nageurs": [self._serialize_nageur(item) for item in nageurs_iterable],
        }

    def _serialize_saison(self, saison: Any) -> Dict[str, Any]:
        competitions_attr = getattr(saison, "_Saison__competitions__", None)
        if competitions_attr is None:
            competitions_attr = getattr(saison, "competitions", [])
        if callable(competitions_attr):
            competitions_iterable = competitions_attr()
        else:
            competitions_iterable = competitions_attr
        serialized_competitions = [self._serialize_competition(item) for item in competitions_iterable]
        return {
            "saison": getattr(saison, "saison", None),
            "competitions": serialized_competitions,
        }
