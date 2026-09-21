# Jardin du Cœur — V206 (stabilisation)

Cette release conserve l'interface et les données locales V205 tout en renforçant les frontières techniques avant la poursuite du projet.

## Changements majeurs

- Conservation de la clé de stockage `jardin-du-coeur-v1` pour éviter toute migration destructive des journaux V205.
- Version produit `1.2.1`, build `206`, schéma de sauvegarde `1`.
- Export enrichi avec `appVersion`, `build` et `schemaVersion`.
- Import compatible V205, normalisé, limité à 5 Mio et refusant les schémas futurs inconnus.
- Service worker V206 : fallback HTML réservé aux navigations, cache dynamique limité à la même origine.
- Les erreurs d'enregistrement du service worker sont désormais visibles dans la console.
- GitHub Pages publie un artefact minimal (`index.html`, service worker, manifest, `.nojekyll`, icônes) au lieu du dépôt complet.
- Nouveau validateur applicatif `tools/validate_app_release.py` exécuté avant déploiement.

## Corpus religieux

Aucun contenu religieux n'a été promu ni modifié par cette release technique. Les garde-fous éditoriaux existants restent séparés du QA applicatif.

## Validation

Le nouveau QA applicatif passe 11/11 contrôles. Le validateur historique du corpus conserve son contrôle `runtime-unchanged` basé sur l'ancien `index.html` : il échoue donc volontairement après la modification du runtime V206. Ce contrôle historique n'a pas été falsifié pour afficher artificiellement un PASS.
