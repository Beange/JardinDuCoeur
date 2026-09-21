# Release V216 — Tests et non-régression

## Changements

- Version **1.5.4 / build 216** et cache PWA V216.
- Ajout d'une suite dédiée `tests/test_app_regression.py` pour le shell applicatif, indépendante du corpus religieux.
- Contrôles de cohérence de version, manifeste, fichiers précachés, paysages, stockage/récupération, import, accessibilité, mise à jour PWA, sécurité de portée du service worker, icônes et IDs HTML.
- Le validateur applicatif existant reste la barrière de release ; le validateur historique du corpus reste exécuté sans modifier les données.
- Corpus religieux maintenu en standby.

## Validation

Exécuter :

`python3 -m unittest -v tests/test_app_regression.py`

puis :

`python3 tools/validate_app_release.py`

`python3 tools/validate_project.py`
