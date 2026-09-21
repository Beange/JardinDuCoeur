# V303 — Manifeste des ressources par cache

Chaque cache V303+ enregistre la liste de ses ressources obligatoires dans `__cache_ready__` après leur mise en cache. La validation d’un cache antérieur s’appuie sur son propre manifeste, et vérifie encore la présence de chaque ressource. Pour les caches V301/V302 à marqueur texte et les caches plus anciens sans marqueur, la liste figée du noyau V302 sert de référence de compatibilité. Un cache V303+ dont le manifeste manque ou est invalide est rejeté. Le sélecteur inutilisé a été supprimé. Aucun test navigateur réel n’est revendiqué.
