# V290 — Cohérence du cache

Le secours depuis le cache precedent ne sert plus les ressources CORE de la PWA : un echec reseau ne peut plus substituer un ancien app.js, app.css ou index.html a la version active. Le cache precedent reste conserve pour les ressources non CORE.

Limite : un onglet ancien hors ligne peut echouer a charger une ressource CORE absente du cache actif ; un rechargement vers la version active est alors necessaire. Aucune modification du stockage utilisateur.
