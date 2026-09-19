# Bibliothèque religieuse — état de transmission

## Ce qui est réellement dans le code

Le dernier `index.html` contient un tableau `DAILY_QUOTES` de **30 entrées Qurʾān**. `tools/extract-daily-quotes.mjs` extrait ce tableau sans réécrire son contenu vers `data/religious-library-implemented.json`.

Ces 30 entrées sont **provisoires** : elles ne constituent pas la bibliothèque finale annoncée de 183 entrées et certaines sont des extraits.

## Registre audité dans la conversation

L’audit conversationnel a été poussé jusqu’au jalon :

- 140/140 hadiths ;
- 43/43 dossiers Qurʾān ;
- total canonique cible : 183/183.

Cependant, les 183 objets complets (texte, métadonnées, relations, flags, etc.) n’ont pas été générés dans un fichier réel. Le présent ZIP ne fabrique donc pas ces données manquantes.

## Règles de structure retenues

- Une entrée canonique compte `+1`.
- Variante, parallèle, extrait éditorial et verset de contexte comptent `+0`.
- `translationFull` Qurʾān doit rester séparé de `homeExcerpt`.
- Une entrée `contextual` ou `ficheOnly` ne doit pas être tirée automatiquement sur l’accueil.
- La sélection quotidienne ne doit pas être personnalisée à partir de l’humeur, du journal, des prières, du cycle ou d’autres données intimes.
- Pas de score religieux, streak, mérite chiffré ou diagnostic spirituel.

## Source Qurʾān cible

Le standard retenu dans l’audit est : **QuranEnc — traduction française Muhammad Hamidullah — V1.0.2 — 02/07/2025**.

Le code actuel n’est pas encore migré vers ce schéma de production ; c’est un travail `PENDING`.

## Corpus canonique de travail

Le fichier `data/religious-library-canonical-work.json` contient actuellement **15 dossiers Qurʾān vérifiés sur 43**. Il reste un fichier de travail et ne doit pas encore être présenté comme la bibliothèque finale de 183 entrées.
