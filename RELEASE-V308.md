# V308 — Protection des formulaires modaux lors des mises à jour

Le rechargement automatique déclenché par `controllerchange` est différé si une fenêtre modale ouverte contient des valeurs de champs modifiées depuis son ouverture. Le blocage du rechargement en cas d'échec de sauvegarde introduit en V307 reste actif.

Les tests de régression couvrent les champs modifiés, la sauvegarde refusée et le rechargement autorisé quand le formulaire n'a pas été modifié. Cette validation automatisée ne remplace pas une validation dans un navigateur réel.
