# Jardin du Cœur — V207

Base fonctionnelle : interface v1.4.4 reçue, consolidée avec les protections de V206.

## Changements principaux
- Version application 1.4.5, build 207, schéma de données 1.
- Conservation de la clé locale `jardin-du-coeur-v1` pour ne pas casser les données existantes.
- Mode sombre étendu à l'ensemble des écrans de l'interface.
- Import JSON normalisé, limite de 5 Mo, refus des schémas futurs et compatibilité avec les anciennes sauvegardes.
- Export enrichi avec version application, build et version du schéma.
- Service worker V207 limité au même domaine ; fallback HTML réservé aux navigations.
- Artefact GitHub Pages minimal : les dossiers d'audit et le corpus de travail ne sont pas publiés automatiquement.
- Corpus religieux conservé intact dans le projet de travail ; aucune promotion éditoriale effectuée.

## Validation
Exécuter `python tools/validate_app_release.py` pour les contrôles applicatifs V207.
Le validateur historique `validate_project.py` contient encore des assertions liées à d'anciens snapshots du runtime ; ses résultats doivent être interprétés comme contrôles historiques du corpus, pas comme validation de l'interface V207.
