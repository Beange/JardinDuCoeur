# Corrections apportées suite à l'audit (base V278)

## 🔴 Critique
- **`.github/workflows/deploy-pages.yml`** : ajout de `dua-library.js` et `cycle-listen.js` à la copie vers `_site/`. Ces fichiers sont chargés par `index.html` et précachés par `sw.js`, mais n'étaient pas publiés — `tools/check_pages_artifact.py` devait faire échouer le déploiement depuis la V269/V273. Vérifié en local : le build `_site/` passe maintenant `check_pages_artifact.py` (32 ressources).

## 🟠 Sécurité
- **CSP** ajoutée dans `index.html` : `default-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. `script-src`/`style-src` gardent `'unsafe-inline'` pour ne pas casser les 48 `onclick=` et 35 `style=` inline existants — voir "Pour aller plus loin" ci-dessous pour la version stricte.
- **Verrou d'application par code (PIN)** : nouvel écran `#lockScreen`, réglage "Verrouillage" dans Moi → Paramètres. Le code n'est jamais stocké en clair : `salt` aléatoire (`crypto.getRandomValues`) + `SHA-256(salt+code)` via `crypto.subtle`, sauvegardés sous `jardin-du-coeur-v1-lock`. Ralentissement progressif après 3 essais échoués (2s, 4s, 8s… jusqu'à 15s), contre le brute-force local.
- **`uid()`** : utilise `crypto.randomUUID()` quand disponible (repli sur l'ancien schéma sinon).

## 🧪 Garde-fous ajoutés
- `tools/validate_app_release.py` : 5 nouveaux checks (`security-csp-meta`, `security-deploy-includes-all-scripts`, `security-crypto-uid`, `security-lock-feature`, `security-lock-hashed-not-plaintext`) + budget JS relevé à 180 Ko (justifié par la fonctionnalité de verrouillage).
- `tests/test_app_regression.py` : budget JS aligné sur 180 Ko.
- Les 54 tests existants + les 208 checks de `validate_app_release.py` passent.

## Pour aller plus loin (non fait ici, à discuter)
- **CSP stricte sans `'unsafe-inline'`** : nécessite de migrer les 48 `onclick="..."` vers `addEventListener` et les 35 `style="..."` vers des classes CSS. Refactor plus large, à faire par petits lots testables plutôt qu'en un seul passage.
- **`data/` et `historique/`** (~8 Mo) : corpus de travail éditorial non utilisé par l'app en exécution (aucun `fetch`, aucun import). Recommandé de sortir ce contenu du dépôt applicatif (dépôt séparé ou branche dédiée), surtout que certains fichiers portent des statuts "audit"/"reconstruction" (contenu religieux non encore validé) — pas touché ici pour ne pas prendre de décision de structure de dépôt à votre place.
