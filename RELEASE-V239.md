# Release V239 — Saisie sûre & reprise du dernier champ

Version applicative : **1.8.2 · build 239**.

## Objectif
Rendre l’autosauvegarde plus rassurante et limiter les pertes de contexte lors d’une navigation rapide, sans toucher au corpus religieux.

## Changements
- L’état de sauvegarde annonce maintenant l’heure de la dernière écriture locale et est exposé comme statut accessible.
- Le dernier champ de saisie actif est mémorisé dans la session d’interface.
- À la réouverture, le focus revient sur ce champ lorsqu’il appartient encore à l’écran restauré et reste modifiable.
- Une persistance de sécurité est déclenchée lors de `pagehide` et lorsque l’application passe en arrière-plan.
- Aucun changement du schéma de données utilisateur.
- Corpus religieux maintenu en standby.
