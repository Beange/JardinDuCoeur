# V291 — limitation du secours entre caches

Le service worker ne consulte l'ancien cache en cas d'échec réseau que pour les requêtes de destination `image` ou `font`. Les scripts, styles, documents et autres types de ressources ne sont plus servis depuis un ancien cache par ce mécanisme. Le cache et le build passent à 291. Les données locales ne sont pas modifiées.

Limites : une validation navigateur multi-onglets et hors ligne reste nécessaire. Les en-têtes HTTP de sécurité doivent être vérifiés sur l'hébergement effectif.
