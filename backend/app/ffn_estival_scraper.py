"""Scraper pour les rankings de natation estivale FFN."""
import re
from typing import Any, Dict, List

import requests
from bs4 import BeautifulSoup


class FFNEstivalScraper:
    """Scraper pour récupérer les rankings de natation estivale depuis le site FFN."""

    BASE_URL = "https://ffn.extranat.fr/webffn/ete_rankings.php"

    def get_club_rankings(self, club_id: str, season: str, sex: str = "2") -> Dict[str, Any]:
        """
        Récupère les rankings d'un club pour une saison.
        
        Args:
            club_id: ID du club (ex: "2447")
            season: Année de la saison (ex: "2025")
            sex: "1" pour hommes, "2" pour dames
            
        Returns:
            Dict contenant les performances groupées par nage
        """
        url = f"{self.BASE_URL}?idact=ete&go=clb&idsai={season}&idrch_id={club_id}&idsex={sex}"
        
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, "html.parser")
        
        # Trouver toutes les sections de nage
        performances_by_nage: Dict[str, List[Dict[str, Any]]] = {}
        current_nage = None
        
        # Parcourir toutes les tables
        for table in soup.find_all("table"):
            for row in table.find_all("tr"):
                # Récupérer toutes les cellules
                cells = row.find_all(["td", "th"])
                
                if not cells:
                    continue
                
                # Cas 1: Titre de nage (une seule cellule avec colspan, souvent 6)
                if len(cells) == 1:
                    colspan_val = cells[0].get("colspan")
                    if colspan_val and int(colspan_val) >= 4:  # Colspan de 4 ou plus = titre de nage
                        nage_text = cells[0].get_text(strip=True)
                        # Nettoyage: retirer les emojis et artifacts
                        nage_text = re.sub(r"[♀♂⚥🏊]+", "", nage_text).strip()
                        if nage_text and len(nage_text) < 100:
                            # Normaliser le nom (50 Nage Libre → 50 NAGE LIBRE)
                            current_nage = nage_text.upper()
                            if current_nage not in performances_by_nage:
                                performances_by_nage[current_nage] = []
                        continue
                
                # Cas 2: Ligne de performance (5 cellules: rang, nageur, temps, date, vide)
                if current_nage and len(cells) == 5:
                    try:
                        # Le premier champ doit être un numéro (rang)
                        rank_text = cells[0].get_text(strip=True).rstrip(".")
                        if not rank_text or not rank_text.isdigit():
                            continue
                        
                        # Deuxième colonne: nom du nageur avec année
                        nageur_cell = cells[1].get_text(strip=True)
                        # Format attendu: "NOM Prénom (YYYY/XX ans) FRA" ou similaire
                        match = re.search(r"(.+?)\s*\((\d{4})/", nageur_cell)
                        
                        if match:
                            nageur_name = match.group(1).strip()
                            year_of_birth = match.group(2)
                        else:
                            # Fallback: prendre tout avant la parenthèse
                            nageur_name = nageur_cell.split("(")[0].strip()
                            year_of_birth = "na"
                        
                        if not nageur_name:
                            continue
                        
                        # Troisième colonne: temps
                        temps = cells[2].get_text(strip=True)
                        # Vérifier que c'est bien un temps (format HH:MM:SS.cs ou MM:SS.cs)
                        if not re.match(r"\d{1,2}:\d{2}[:.]\d{2}", temps):
                            continue
                        
                        # Quatrième colonne (optionnelle): date
                        date = cells[3].get_text(strip=True) if len(cells) > 3 else ""
                        
                        perf_data = {
                            "nageur": nageur_name,
                            "temps": temps,
                            "yearofbirth": year_of_birth,
                            "date": date,
                            "rank": int(rank_text),
                            "iuf": "na",
                            "classement": f"{rank_text}{'er' if rank_text == '1' else 'e'}",
                            "competition": "Natation Estivale",
                        }
                        
                        performances_by_nage[current_nage].append(perf_data)
                    except (IndexError, ValueError, AttributeError):
                        continue
        
        return {
            "saison": season,
            "club_id": club_id,
            "sexe": "F" if sex == "2" else "M",
            "performances_by_nage": performances_by_nage,
        }
