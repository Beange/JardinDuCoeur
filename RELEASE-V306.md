# V306 — Tests de récupération réseau

Version de maintenance des tests : le service worker et le code de l'application restent identiques à V305.

Ajout de `tests/test_sw_fetch_v306.js`, exécuté automatiquement par `tests/test_sw_behavior_runner.py` : vérification simulée d'une réponse 404, d'une réponse 503 pour une image, d'une panne réseau pour une police, du service hors ligne du noyau actif et du refus de mélanger les fichiers du noyau entre versions. Le test n'est pas une validation dans un navigateur réel.

Commande : `python -m unittest discover -s tests -q`.
