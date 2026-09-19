# Release V228 — Recette globale des parcours

Version applicative : **1.7.1 · build 228**.

## Objectif

V228 est une passe de recette globale avant de poursuivre les évolutions fonctionnelles. Le corpus religieux reste en standby et n'est pas modifié.

## Changements

- ajout d'une suite de smoke tests dédiée aux parcours utilisateur principaux ;
- contrôle du parcours Aujourd'hui → Ma journée → Muhâsabah → Journal ;
- contrôle Journal → historique → reprise d'une journée ;
- contrôle Habitudes → Objectifs → Progression ;
- contrôle sauvegarde/restauration et protections d'import ;
- contrôle du cycle PWA mise à jour / hors-ligne ;
- contrôle automatique de tous les `getElementById()` du runtime contre le HTML ;
- restauration de `RELEASE-V225.md` dans l'historique de release, absent du paquet V227 ;
- emballage ZIP corrigé pour avoir `Jardin-du-Coeur-PWA-V228/` directement à la racine de l'archive.

Aucune donnée du dossier `data/` n'est modifiée.
