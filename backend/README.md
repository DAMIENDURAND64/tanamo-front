# API Externe FFN

Petit service FastAPI qui encapsule la librairie Python [`extranatapi`](https://pypi.org/project/extranatapi/) afin d'exposer une API REST plus simple à consommer depuis Tanamo (ou toute autre application).

## Pré-requis

- Python 3.10 ou supérieur
- Environnement virtuel recommandé (`python -m venv .venv`)

## Installation

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Démarrage

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

L'API est alors disponible sur `http://localhost:8000`. La documentation interactive est générée automatiquement par FastAPI :

- Swagger UI : `http://localhost:8000/docs`
- ReDoc : `http://localhost:8000/redoc`

## Endpoints exposés

| Méthode | Chemin | Description | Paramètres supportés |
|---------|--------|-------------|-----------------------|
| GET | `/health` | Vérifie que le service répond | — |
| GET | `/regions` | Liste des régions FFN | — |
| GET | `/departements` | Liste des départements | `regionId` (optionnel) |
| GET | `/clubs` | Liste des clubs | `regionId`, `departementId` (optionnels) |
| GET | `/nages` | Nages connues pour la cotation | — |
| GET | `/nageurs/{iuf}` | Meilleures performances d'un nageur | `allPerformances` (booléen) |
| GET | `/clubs/{clubId}/saisons/{seasonYear}` | Résultats d'un club sur une saison | — |

## Exemple de requête

```bash
curl "http://localhost:8000/nageurs/123456" \
  -H "Accept: application/json"
```

```json
{
  "name": "DUPONT Alice",
  "sexe": "F",
  "yearofbirth": "2008",
  "age": "16",
  "iuf": "123456",
  "nationality": "FRA",
  "nages": [
    {
      "name": "50 NL",
      "classement": "1",
      "temps": "00:27.10",
      "points": "950",
      "bassin": "25",
      "date": "03/03/2024"
    }
  ]
}
```

## Notes d'usage

- Le service met en cache les listes (régions, départements, clubs, nages) pour limiter les requêtes vers `ffn.extranat.fr`. Le TTL par défaut est d'une heure (six heures pour les clubs).
- Les endpoints sont purement en lecture (`extranatapi` ne gère que des données publiques).
- Ajoute un proxy HTTP/HTTPS si ton environnement réseau bloque l'accès direct à `https://ffn.extranat.fr`.
- Pour une intégration Expo/React Native, crée un client HTTP qui pointe vers l'URL de déploiement (Railway, Render, Fly.io, etc.) puis consomme ces endpoints REST.
- Côté application Expo, expose `EXPO_PUBLIC_FFN_API_BASE_URL` pour référencer l'URL du service (sinon `http://localhost:8000` est utilisé par défaut en développement).
