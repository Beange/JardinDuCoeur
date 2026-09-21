# V279 — cache et sécurité

- Cache applicatif immuable par version ; suppression de la revalidation en arrière-plan des ressources mises en cache.
- Les navigations restent réseau d’abord avec repli hors ligne sur la page précachée.
- Suppression de `unsafe-inline` de `script-src` et remplacement des attributs `onclick` du HTML par des actions déléguées.
- `unsafe-inline` reste nécessaire dans `style-src` : styles inline statiques et dynamiques présents dans l’application. Sa suppression nécessite une migration CSS distincte.
- La directive `frame-ancestors` d'une CSP meta n'est pas appliquée : configurer un en-tête HTTP CSP côté hébergeur pour protéger contre l'encadrement.
- Les caches anciens sont supprimés à l’activation ; une page déjà ouverte peut nécessiter le rechargement prévu par l’application.
