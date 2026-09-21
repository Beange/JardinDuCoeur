# V292 — Sauvegarde avant rechargement PWA

Le gestionnaire `controllerchange` appelle `persistBeforeLeave()` avant `location.reload()`. Cette sauvegarde porte sur l’état applicatif et la session UI tels que gérés par la fonction existante. Elle ne garantit pas la conservation des champs non synchronisés dans cet état.

Version du build et du cache synchronisée sur 292. Test de non-régression ajouté. Validation multi-onglets et mobile restant à effectuer.
