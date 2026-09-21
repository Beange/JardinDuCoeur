# V285 — CSP et hébergement

La directive `frame-ancestors` ne fonctionne pas dans une CSP déclarée par `<meta>`. Elle a été retirée de cette balise pour éviter une impression trompeuse de protection.

Pour bloquer l’intégration dans une iframe, configurer **sur le serveur HTTP** l’en-tête `Content-Security-Policy: frame-ancestors 'none'` sur les réponses HTML. Vérifier dans les outils réseau du navigateur que cet en-tête est effectivement envoyé.

**GitHub Pages** : ce dépôt contient un workflow GitHub Pages. Le fichier `_headers` de certains hébergeurs n’est pas pris en charge par GitHub Pages. La configuration d’en-têtes arbitraires n’est pas disponible directement sur GitHub Pages ; utiliser un hébergement ou un proxy qui permet de définir ces en-têtes si cette protection est nécessaire. Ne pas ajouter une directive `frame-ancestors` uniquement dans la balise meta.

Les données locales ne sont ni migrées ni effacées par les changements V285. Leur conservation effective lors d’une mise à jour doit être vérifiée dans un navigateur.
