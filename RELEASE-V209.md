# Release V209 — refactorisation technique

Date : 19 septembre 2026

## Objectif

V209 ouvre le cycle hors corpus religieux. Aucun fichier du corpus religieux n’est modifié fonctionnellement.

## Changements

- version applicative : **1.4.7 · build 209** ;
- CSS extrait de `index.html` vers `app.css` ;
- JavaScript applicatif extrait de `index.html` vers `app.js` ;
- `index.html` devient une coque HTML plus lisible ;
- cache PWA incrémenté vers `jardin-du-coeur-v209` ;
- `app.css` et `app.js` ajoutés au cœur précaché du service worker ;
- ajout d’une empreinte de gel du corpus : `CORPUS-STANDBY.sha256`.

## Corpus religieux

Statut : **STANDBY**. Les travaux fonctionnels V209+ ne doivent pas modifier le corpus sans réouverture explicite de ce chantier.

Empreinte agrégée au moment du gel : `672a968bb4ba54adf0abf75b6fca072aa4c573e3e2d0a789910cdae6e3e4f41f` (231 fichiers suivis).

## Compatibilité

La clé `localStorage` et `DATA_SCHEMA_VERSION` restent inchangées. Les données utilisateur existantes restent donc compatibles.
