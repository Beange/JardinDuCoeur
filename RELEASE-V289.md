# V289 — Transition de cache PWA

Conserve temporairement le cache precedent lors de l’activation du nouveau service worker. En cas d’echec reseau pour une ressource absente du cache courant, recherche une copie dans le cache precedent. Les donnees utilisateur et leur schema ne sont pas modifies.

Limite : un ancien onglet peut toujours recevoir une ressource nouvelle si celle-ci existe sous le meme chemin ; la validation multi-onglets en navigateur reste necessaire.
