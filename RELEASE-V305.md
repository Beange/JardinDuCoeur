# V305 — Renforcement des tests du service worker

Version de maintenance : aucun changement au code applicatif ni au service worker par rapport à V304.

Le test Node de simulation utilise un marqueur texte et la liste historique complète pour V302, un manifeste JSON pour V303, et vérifie l'installation, l'activation, la conservation du cache précédent et le chargement d'une ressource du noyau hors ligne. Ce test ne remplace pas une validation dans un navigateur réel.

Exécution : `python -m unittest discover -s tests -q`.
