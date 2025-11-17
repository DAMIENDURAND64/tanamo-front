#!/usr/bin/env python3
"""Explorer la structure des données de saison par nage et sexe."""

from extranatapi.wrapper import Wrapper
import json

def main():
    wrapper = Wrapper()
    club_id = '2447'
    year = '2025'
    
    print(f"=== Analyse des données saison {year} du club {club_id} ===\n")
    
    season = wrapper.get_saison(idclub=club_id, annee=year)
    
    # Utiliser to_json_data pour obtenir les données structurées
    season_data = season.to_json_data()
    
    print(f"Structure des données: {json.dumps(season_data, indent=2, ensure_ascii=False)[:1000]}\n")
    
    # Récupérer toutes les performances
    all_performances = {}  # {nage: {sexe: [performances]}}
    
    # Parser les compétitions depuis les données JSON
    competitions = season_data.get('competitions', [])
    
    for comp in competitions:
        nageurs = comp.get('nageurs', [])
        
        for nageur in nageurs:
            sexe = nageur.get('sexe', 'M')
            nages = nageur.get('nages', [])
            
            for nage in nages:
                nage_name = nage.get('name', 'Inconnu')
                
                if nage_name not in all_performances:
                    all_performances[nage_name] = {'M': [], 'F': []}
                
                perf_data = {
                    'nageur': nageur.get('name', 'Inconnu'),
                    'temps': nage.get('temps', 'N/A'),
                    'classement': nage.get('classement', 'N/A'),
                    'competition': comp.get('name', 'Inconnu'),
                    'iuf': nageur.get('iuf', 'na'),
                    'yearofbirth': nageur.get('yearofbirth', 'na'),
                }
                
                if sexe in all_performances[nage_name]:
                    all_performances[nage_name][sexe].append(perf_data)
    
    # Afficher les résultats par nage
    print(f"Nombre total de nages différentes: {len(all_performances)}\n")
    
    # Afficher quelques exemples
    for i, (nage_name, by_sexe) in enumerate(list(all_performances.items())[:5]):
        print(f"\n{'='*60}")
        print(f"Nage: {nage_name}")
        print(f"{'='*60}")
        
        for sexe in ['M', 'F']:
            perfs = by_sexe[sexe]
            if perfs:
                print(f"\n  {sexe} - {len(perfs)} performance(s):")
                for j, perf in enumerate(perfs[:3]):
                    print(f"    {j+1}. {perf['nageur']} - {perf['temps']} ({perf['classement']})")
                    print(f"       IUF: {perf['iuf']} - Compétition: {perf['competition'][:50]}")
                
                if len(perfs) > 3:
                    print(f"    ... et {len(perfs) - 3} autre(s)")
    
    # Statistiques globales
    print(f"\n\n{'='*60}")
    print("STATISTIQUES GLOBALES")
    print(f"{'='*60}")
    
    total_perfs_m = sum(len(by_sexe['M']) for by_sexe in all_performances.values())
    total_perfs_f = sum(len(by_sexe['F']) for by_sexe in all_performances.values())
    
    print(f"Total performances Hommes: {total_perfs_m}")
    print(f"Total performances Femmes: {total_perfs_f}")
    print(f"Total performances: {total_perfs_m + total_perfs_f}")
    
    # Top 5 nages avec le plus de performances
    print("\nTop 5 nages avec le plus de performances:")
    nages_sorted = sorted(
        all_performances.items(), 
        key=lambda x: len(x[1]['M']) + len(x[1]['F']), 
        reverse=True
    )
    
    for i, (nage_name, by_sexe) in enumerate(nages_sorted[:5]):
        total = len(by_sexe['M']) + len(by_sexe['F'])
        print(f"  {i+1}. {nage_name}: {total} perf(s) (M: {len(by_sexe['M'])}, F: {len(by_sexe['F'])})")
    
    # Exporter un échantillon en JSON
    print("\n\nÉchantillon JSON (première nage):")
    if all_performances:
        first_nage = list(all_performances.items())[0]
        sample = {
            first_nage[0]: first_nage[1]
        }
        print(json.dumps(sample, indent=2, ensure_ascii=False)[:500])

if __name__ == "__main__":
    main()
