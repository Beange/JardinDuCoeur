# V300 — Gestion des erreurs HTTP du cache PWA

Le secours vers le cache précédent est tenté pour les images et polices uniquement en cas d’échec réseau ou de réponse serveur 5xx. Les réponses 4xx restent inchangées. En l’absence de ressource précédente, la réponse HTTP du serveur est renvoyée. Aucune modification des clés ou du schéma de stockage utilisateur.

Tests statiques ajoutés ; les transitions réelles doivent encore être vérifiées dans un navigateur.
