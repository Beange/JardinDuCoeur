# Audit de consolidation

## Base utilisée

La base matérielle est le dernier ZIP PWA réellement produit dans la conversation (`jardin-du-coeur-pwa.zip`, 10 septembre 2026 16:46 UTC côté surface de conversation). Ce ZIP contenait :

- une PWA autonome `jardin-du-coeur/` avec manifest, service worker et icônes ;
- un projet React/Vite historique `islamic-journal-pwa/`.

Après ce ZIP, un `index.html` plus récent a été réellement produit dans la conversation. Il a donc remplacé uniquement le `index.html` autonome lors de cette consolidation ; le manifest, le service worker et les icônes proviennent du dernier ZIP PWA.

## Contrôle des versions intermédiaires

Comparaison structurelle effectuée entre les principaux snapshots intermédiaires et le dernier `index.html` :

- aucun ID DOM de la version fonctionnelle pré-PWA n’est absent du dernier fichier ;
- aucune fonction JavaScript nommée de cette version n’est absente du dernier fichier ;
- la version PWA intermédiaire ajoute manifest, installation, service worker et version 1.2.0 ; ces éléments sont toujours présents dans le dernier fichier ;
- le dernier fichier ajoute 8 IDs d’accueil (`dailyHero`, `dailyLandscape`, `dailyQuoteCard`, `dailyQuoteRef`, `dailyQuoteText`, `homeMuhasabahBtn`, `intentionHelpBtn`, `startDayBtn`) et 5 fonctions (`dailyQuoteFor`, `dailySceneFor`, `dayNumberUTC`, `openDailyQuote`, `renderHomeDaily`).

Les snapshots utilisés pour ce contrôle sont conservés dans `historique/`.

## Limite importante

Le corpus religieux complet de 183 entrées n’existait pas comme fichier matériel parmi les artefacts de la conversation. Il serait donc incorrect de le recréer automatiquement à partir de résumés. Le paquet conserve uniquement :

- les 30 citations réellement codées ;
- le manifeste d’état et les règles globales discutées ;
- l’indication explicite que la sérialisation 183/183 reste `PENDING`.
