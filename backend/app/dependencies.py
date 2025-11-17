from functools import lru_cache

from .service import ExtranatService


@lru_cache
def get_service() -> ExtranatService:
    """Singleton ExtranatService pour injection FastAPI."""
    return ExtranatService()
