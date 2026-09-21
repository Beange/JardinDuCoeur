# V304 — Intégration des tests comportementaux

Cette livraison ne modifie pas le code de l'application ni le service worker V303.
Elle ajoute `tests/test_sw_behavior_v303.js` à l'archive publiée et le lance depuis
`tests/test_sw_behavior_runner.py` lors de `python -m unittest discover -s tests`.
Le test utilise Node.js et une simulation en mémoire de CacheStorage ; il ne remplace
pas des essais dans un navigateur. Si Node.js n'est pas disponible, le test est ignoré
et le résultat de la suite doit être interprété en conséquence.
