# GitHub Pages — Jardin du Cœur V268

## Publication propre depuis GitHub Actions

1. Sur GitHub, créez un dépôt (ou ouvrez le dépôt existant) et envoyez **le contenu du dossier `Jardin-du-Coeur-PWA-V268` à la racine du dépôt**. Ne téléversez pas seulement le ZIP ni le dossier parent.
2. Dans **Settings → Pages → Build and deployment → Source**, sélectionnez **GitHub Actions** (pas « Deploy from a branch »).
3. Dans **Actions**, lancez « Deploy Jardin du Coeur to GitHub Pages » avec « Run workflow », ou poussez un commit sur la branche `main`. Vérifiez que le workflow est vert et ouvrez l’URL indiquée par le déploiement.
4. Si le site utilisait auparavant « Deploy from a branch », désactivez cette source en choisissant GitHub Actions. Ne mélangez pas deux méthodes de publication.

Le workflow exécute la validation de l’application, construit un dossier `_site` propre contenant uniquement les ressources nécessaires à l’application (HTML, CSS, JavaScript, manifeste, service worker, icônes et 20 images), puis contrôle que chaque ressource référencée est bien présente avant de publier. Les notes de versions, tests, outils, archives et données de travail **ne sont pas exposés sur le site public**.

**Version :** 2.1.12 · build 268 ; **cache :** `jardin-du-coeur-v268`. Le manifeste utilise des chemins relatifs : le déploiement fonctionne à la racine d’un domaine ou dans le sous-dossier GitHub Pages d’un dépôt.

## Vérification après publication

Ouvrez le lien Pages dans une fenêtre privée, vérifiez que les rubriques et les images se chargent, puis installez l’application et vérifiez son ouverture hors connexion. Si une ancienne version reste affichée, fermez les onglets de l’application, rouvrez la page en ligne et acceptez l’éventuelle proposition de mise à jour. Évitez de supprimer les données du navigateur : le journal et le suivi du cycle sont stockés localement.

**Limite :** ce correctif prépare et vérifie les fichiers du déploiement ; il ne publie pas lui-même sur votre compte GitHub et ne remplace pas un test sur le site réellement en ligne.
