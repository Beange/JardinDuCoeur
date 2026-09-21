# Release V229 — Reprise et sauvegarde perceptible

Version applicative : **1.7.2 · build 229**.

## Objectif

Améliorer la continuité d’usage quotidienne sans modifier le corpus religieux.

## Changements

- mémorisation locale du dernier écran utilisé ;
- mémorisation de la journée sélectionnée et restauration au prochain lancement ;
- garde-fou empêchant de restaurer une date future ;
- retour visuel `Enregistrement…` puis `✓ Enregistré sur cet appareil` lors des écritures ;
- suppression de l’état de reprise lors de l’effacement complet des données ;
- cache PWA incrémenté vers V229 ;
- tests de non-régression étendus à ces comportements.

Le dossier `data/` reste en standby et n’est pas modifié.
