# V284 — corrections ciblées

- Correction de deux erreurs JavaScript lors de la suppression d'un objectif ou d'une habitude : les notifications référençaient des variables non définies (`o` et `e`).
- Synchronisation du numéro de build affiché, de la constante applicative, du cache service worker et du test de version.
- Clé de stockage et schéma utilisateur inchangés.

Validation : `node --check app.js`, `node --check sw.js`, `python -m pytest -q tests` (54 tests réussis).

Limites : tests en navigateur, migration réelle des caches et CSP envoyée en en-tête HTTP par l'hébergeur non validés. Le `frame-ancestors` présent dans la meta CSP n'est pas appliqué par les navigateurs : le configurer dans un en-tête HTTP sur l'hébergement.
