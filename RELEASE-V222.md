# Release V222 — Audit fonctionnel et cohérence

Version : **1.6.5 · build 222**

## Changements
- audit ciblé des contrôles visibles afin d’éviter les actions sans effet ;
- activation des boutons d’historique de l’accueil et du Journal : accès aux 10 dernières journées enregistrées ;
- suppression du bouton « + » sans action dans la seconde partie de « Ma journée » ;
- vues Journal Semaine / Mois / Année explicitement désactivées tant qu’elles ne sont pas implémentées ;
- remise à niveau de la suite de non-régression, dont les assertions de version étaient restées sur V219 ;
- aucune modification du corpus religieux en standby.

## Principe
Une commande visible doit soit fonctionner, soit être clairement indiquée comme indisponible. V222 réduit les faux affordances avant de poursuivre les nouvelles fonctions.
