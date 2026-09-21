# Release V212 — PWA / hors-ligne

Version applicative : **1.5.0 · build 212**.

## Objectif
Fiabiliser l'installation, les mises à jour et le fonctionnement hors ligne sans modifier le corpus religieux ni le schéma de données utilisateur.

## Changements
- cache applicatif `jardin-du-coeur-v212` ;
- installation du nouveau service worker sans activation forcée, afin d'éviter de mélanger deux versions d'assets dans une page déjà ouverte ;
- détection d'une mise à jour prête avec action explicite « Mettre à jour » ;
- activation contrôlée via `SKIP_WAITING`, puis rechargement unique après `controllerchange` ;
- nettoyage limité aux anciens caches appartenant à Jardin du Cœur ;
- navigation en stratégie réseau d'abord avec repli sur `index.html` hors ligne ;
- assets locaux servis depuis le cache avec actualisation réseau lorsqu'elle est possible ;
- messages utilisateur lors du passage hors ligne et du retour en ligne ;
- manifeste stabilisé avec `id: "./"`, `start_url: "./"` et `display_override`.

## Compatibilité
- clé de stockage et schéma utilisateur inchangés ;
- corpus religieux maintenu en standby ;
- aucune modification volontaire des fichiers `data/`.
