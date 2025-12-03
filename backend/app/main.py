import ssl
from typing import Any

import certifi
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from .dependencies import get_service
from .ffn_estival_scraper import FFNEstivalScraper
from .service import ExtranatService

# Configuration SSL pour Python 3.13 sur macOS
ssl._create_default_https_context = ssl._create_unverified_context

app = FastAPI(
    title="FFN Extranat Proxy API",
    version="0.1.0",
    description="API REST externe basée sur extranatapi pour exposer les données publiques FFN.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/regions")
async def list_regions(service: ExtranatService = Depends(get_service)) -> list[dict[str, Any]]:
    return await service.get_regions()


@app.get("/departements")
async def list_departements(
    region_id: str | None = Query(default=None, alias="regionId"),
    service: ExtranatService = Depends(get_service),
) -> list[dict[str, Any]]:
    return await service.get_departements(region_id=region_id)


@app.get("/clubs")
async def list_clubs(
    region_id: str | None = Query(default=None, alias="regionId"),
    departement_id: str | None = Query(default=None, alias="departementId"),
    service: ExtranatService = Depends(get_service),
) -> list[dict[str, Any]]:
    return await service.get_clubs(region_id=region_id, departement_id=departement_id)


@app.get("/nages")
async def list_nages(service: ExtranatService = Depends(get_service)) -> list[str]:
    return await service.list_nages()


@app.get("/nageurs/{iuf}")
async def get_nageur(
    iuf: str,
    include_all: bool = Query(default=False, alias="allPerformances"),
    service: ExtranatService = Depends(get_service),
) -> dict[str, Any]:
    try:
        return await service.get_nageur(iuf=iuf, include_all=include_all)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.get("/clubs/{club_id}/saisons/{season_year}")
async def get_club_season(
    club_id: str,
    season_year: str,
    service: ExtranatService = Depends(get_service),
) -> dict[str, Any]:
    return await service.get_club_season(club_id=club_id, season_year=season_year)


@app.get("/clubs/{club_id}/saisons/{season_year}/performances")
async def get_club_season_performances(
    club_id: str,
    season_year: str,
    service: ExtranatService = Depends(get_service),
) -> dict[str, Any]:
    """Récupère les performances groupées par nage et sexe pour une saison."""
    return await service.get_club_season_performances(club_id=club_id, season_year=season_year)


@app.get("/clubs/{club_id}/saisons/{season_year}/estival/performances")
async def get_club_estival_rankings(
    club_id: str,
    season_year: str,
    sex: str = Query(default="2", description="1 pour hommes, 2 pour dames"),
) -> dict[str, Any]:
    """Récupère les rankings de natation estivale d'un club."""
    scraper = FFNEstivalScraper()
    try:
        result = scraper.get_club_rankings(club_id=club_id, season=season_year, sex=sex)
        
        # Reformater pour correspondre au format attendu par le frontend
        performances_by_nage = {}
        
        for nage, perfs in result["performances_by_nage"].items():
            performances_by_nage[nage] = {
                "M": perfs if sex == "1" else [],
                "F": perfs if sex == "2" else [],
            }
        
        return {
            "saison": season_year,
            "club_id": club_id,
            "performances_by_nage": performances_by_nage,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Erreur lors du scraping: {str(exc)}") from exc


def create_app() -> FastAPI:
    """Hook pour les tests."""
    return app


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
