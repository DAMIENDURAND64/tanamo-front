"""Script de debug pour analyser la page FFN."""
import requests
from bs4 import BeautifulSoup

url = "https://ffn.extranat.fr/webffn/ete_rankings.php?idact=ete&go=clb&idsai=2025&idrch_id=2447&idsex=2"
response = requests.get(url, timeout=30)

soup = BeautifulSoup(response.content, "html.parser")

print("=== Analyse de la structure HTML ===\n")

# Trouver toutes les tables
tables = soup.find_all("table")
print(f"Nombre de tables: {len(tables)}\n")

for i, table in enumerate(tables[:3]):  # Limiter aux 3 premières
    print(f"\n--- Table {i+1} ---")
    rows = table.find_all("tr")
    print(f"Nombre de lignes: {len(rows)}\n")
    
    for j, row in enumerate(rows[:10]):  # Limiter aux 10 premières lignes
        cells = row.find_all(["td", "th"])
        print(f"Ligne {j+1}: {len(cells)} cellules")
        for k, cell in enumerate(cells):
            text = cell.get_text(strip=True)[:50]  # Limiter à 50 caractères
            bgcolor = cell.get("bgcolor", "none")
            colspan = cell.get("colspan", "none")
            print(f"  Cell {k+1} [bgcolor={bgcolor}, colspan={colspan}]: {text}")
        print()
