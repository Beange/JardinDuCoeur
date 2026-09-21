# V208 — audit du paquet « clean » + correction du fond « paysage du jour »

## Contexte

Ce paquet correspond à `Jardin-du-Coeur-PWA-V207-clean` (post-nettoyage
`source-react/`, cf. `RELEASE-V207-CLEANUP.md`). Un audit complet a été
refait sur ce paquet, indépendamment de l'audit précédent effectué sur
`pwa.zip`.

## Méthode d'audit (identique à l'audit précédent, reconduite ici)

1. Extraction et validation syntaxique du JavaScript embarqué (`node --check`).
2. Lint (ESLint, règles `no-undef`/`no-dupe-keys`/`no-unreachable`/etc.).
3. Cross-check automatisé : tous les `getElementById(...)` du JS comparés aux
   `id=` du HTML (98 références, 0 manquante).
4. Cross-check des `onclick="..."` contre les fonctions JS définies (0 manquante).
5. Détection des `id=` dupliqués (2 cas, dans des modales jamais ouvertes
   simultanément → sans impact réel).
6. Vérification de l'équilibre des accolades dans les 5 blocs `<style>`.
7. Recherche de toute référence `url(...)` ou `src="..."` pointant vers un
   fichier externe (hors data-URI base64) potentiellement manquant.
8. Test fonctionnel avec un DOM simulé (`jsdom`) : chargement complet de la
   page, navigation sur les 10 écrans, ouverture de toutes les modales
   (citation du jour, profil, du‘â, cycle), démarrage/fin de période — 0 erreur
   JavaScript levée.
9. `python3 tools/validate_project.py` (validateur maison du corpus/registre
   religieux).

## Résultat

Ce paquet contenait **exactement le même bug** que la version précédemment
auditée (`pwa.zip`) : `DAILY_BACKGROUNDS` référençait 7 fichiers
`./assets/daily/dimanche.jpg` … `samedi.jpg` **jamais livrés** dans
`assets/`. Conséquence : la bannière « paysage du jour » de l'écran d'accueil
restait vide, tous les jours, sur toutes les installations.

Tout le reste de l'audit est passé sans anomalie : 0 ID manquant, 0 gestionnaire
`onclick` cassé, CSS équilibré, 0 autre référence externe cassée, 0 exception
JavaScript pendant le parcours fonctionnel complet.

## Correctif appliqué

Identique à celui du précédent correctif V208 : `DAILY_BACKGROUNDS` réutilise
désormais les images déjà encodées en base64 dans `DAILY_MOSQUE_BACKGROUNDS`
(présentes et fonctionnelles ailleurs dans le fichier), réparties sur les 7
jours de la semaine. Plus aucune dépendance à un fichier externe manquant ;
l'image reste disponible hors-ligne.

`python3 tools/validate_project.py` : 231/231 PASS après mise à jour du hash
de contrôle `runtime-unchanged` (qui verrouille `index.html` contre toute
modification non documentée — mis à jour ici pour refléter ce correctif
volontaire).

## Cohérence de release

La release V208 est désormais alignée de bout en bout : version applicative **1.4.6**, build **208** et cache du service worker `jardin-du-coeur-v208`. Cette évolution force l’invalidation propre du cache V207 lors de l’activation du nouveau service worker. La clé de stockage `jardin-du-coeur-v1` et le schéma de données **1** restent inchangés : aucune migration des données locales n’est requise.

`README.md`, `ETAT-DU-PROJET.md` et `tools/validate_app_release.py` ont également été alignés sur V208. Les documents `RELEASE-V207*.md` restent volontairement inchangés car ils constituent l’historique de la release précédente. Aucune donnée religieuse ni le manifest PWA n’ont été modifiés.
