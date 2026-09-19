# Release V243 — Recette finale & stabilisation

Version applicative : **1.8.6 · build 243**.

## Objectif
Clore le cycle de stabilisation par une recette complète des contrats applicatifs, sans ajouter de fonctionnalité ni modifier les données utilisateur.

## Stabilisation
- Aucun changement du schéma de données : version 1 conservée.
- Clé de stockage locale `jardin-du-coeur-v1` conservée.
- Parcours principaux revalidés : Aujourd’hui, Ma journée, Muhâsabah, Journal, habitudes/objectifs, sauvegarde/restauration et PWA.
- Cache PWA porté à `jardin-du-coeur-v243` pour publier proprement la version stabilisée.
- Les contrôles de release vérifient explicitement le gel des contrats de stockage et la présence des suites de recette.
- Le corpus religieux reste en standby et n’est pas modifié.

## Portée de la recette
La recette automatisée couvre les contrats statiques et les parcours simulés du projet. Elle ne remplace pas une recette manuelle sur plusieurs navigateurs et appareils physiques.
