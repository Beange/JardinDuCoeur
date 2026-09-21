# V307 — Protection des saisies lors de la mise à jour

En cas d’échec de sauvegarde locale pendant `controllerchange`, l’application conserve l’onglet ouvert et avertit de la nécessité d’exporter les données avant tout rechargement. Une sauvegarde réussie déclenche le rechargement habituel. Test de régression ajouté. La clé et le schéma des données restent inchangés.

Limite : un rechargement manuel ou une fermeture de l’onglet après échec du stockage peut encore perdre les modifications non enregistrées. Les tests ne constituent pas une validation navigateur réelle.
