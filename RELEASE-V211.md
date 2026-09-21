# Release V211 — Données utilisateur

## Objectif
Renforcer la sauvegarde et la restauration des données locales sans modifier le corpus religieux.

## Changements
- Application 1.4.9 / build 211.
- Cache PWA `jardin-du-coeur-v211`.
- Conservation d'une copie locale de récupération (`jardin-du-coeur-v1-recovery`) à chaque sauvegarde réussie.
- En cas de JSON principal corrompu, tentative automatique de lecture de la copie de récupération.
- Avant remplacement par un import valide, conservation de l'état courant dans la copie de récupération.
- Import limité à 5 Mio et refus des schémas de données plus récents.
- Normalisation centralisée de la structure des données.
- Effacement volontaire supprime également la copie de récupération.
- Corpus religieux : standby, aucun changement intentionnel dans `data/`.
