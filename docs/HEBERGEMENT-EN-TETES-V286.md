# En-têtes HTTP — V286

Le fichier `_headers` est pris en charge par Netlify et Cloudflare Pages lorsque placé à la racine du répertoire publié. Il ne configure pas automatiquement GitHub Pages, Apache, nginx ou tout autre hébergement. Sur ces hébergements, reproduire les mêmes en-têtes dans la configuration du serveur ou du proxy.

La directive `frame-ancestors 'none'` et `X-Frame-Options: DENY` interdisent l'intégration dans une iframe. Si l'intégration est nécessaire, adapter cette politique explicitement.

Après déploiement, contrôler les en-têtes réellement renvoyés sur l'URL publique du document HTML (par exemple `curl -I https://votre-domaine/`) et tester les parcours applicatifs et la console du navigateur. Les tests statiques ne démontrent pas l'application effective des en-têtes par l'hébergeur.
