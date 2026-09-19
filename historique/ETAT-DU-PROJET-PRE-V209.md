# État V208 — 19 septembre 2026

La base applicative courante est **Jardin du Cœur 1.4.6 · build 208**. Elle reprend V207, intègre le correctif du fond « paysage du jour » et aligne le numéro de build ainsi que le cache du service worker sur V208. Le schéma de données et la clé de stockage restent inchangés afin de préserver les données locales. Le corpus religieux reste volontairement hors du chantier fonctionnel actuel et n’est pas promu en production. Voir `RELEASE-V208.md`.

## V200 — correction canonique N-030 et matrice de preuves

V200 conserve 140/140 hadiths. N-030 est corrigé de Sahih Muslim 2702 vers Sahih Muslim 2707 (Book 48, Hadith 71), conformément à son narrateur/thème/matn. RC-019 et RC-020 disposent de traductions françaises concordantes trouvées sur le Web, mais elles restent des preuves de recherche et ne sont pas promues car leurs éditeurs ne figurent pas dans les canaux autorisés par MULTISOURCE_VERIFIED_FRENCH_V2. État français inchangé : 90 finalisés, 50 à consolider. Aucune traduction synthétique; index.html inchangé.

## V199 — garde de préservation des 140 hadiths

V199 ajoute une règle bloquante : les 140 identifiants canoniques doivent toujours rester présents. Une traduction française non finalisée ne peut jamais provoquer la suppression du hadith. État : 140/140 conservés ; 90 traductions françaises validées ; 50 hadiths conservés pendant consolidation française.

# V198 — déblocage multisource IslamHouse / An-Nawawi

Cinq structures jusque-là en attente sont promues à partir de la publication française IslamHouse « Les 40 hadiths de l’imam An-Nawawi », traduction Rachid Maach, 1ère édition 2021, annoncée libre de droits : RC-005, RC-006, RC-046, RC-057 et RC-065. Chaque identité est recoupée avec la référence canonique et le matn/narrateur. Aucune traduction n’est synthétisée ni fusionnée. Couverture : 90/140 validées, 50/140 en attente. `index.html` reste inchangé.

## V89 — fermeture du graphe de cohérence courant
Le contrat `release-coherence` de V78 ne référençait pas explicitement son propre fichier, la clôture UM V74 ni l’audit documentaire V78, alors que le manifeste courant les utilisait. V89 ferme ce graphe administratif, ajoute des contrôles de présence/cohérence, et ne modifie aucun contenu religieux ni `index.html`.

## V78 — cohérence documentaire courante
Le manifeste courant contenait un pointeur erroné vers une clôture UM « V75 » alors que cette clôture a réellement été effectuée en V74. V78 corrige le libellé et le chemin vers `docs/AUDIT-HADITH-UNMAPPED-CLOSURE-V74.txt`, ajoute un contrôle de non-régression, et ne modifie aucun contenu religieux ni le runtime.

## V76 — classification des reliquats de décision hadith
Le registre canonique V44 a été audité pour distinguer les statuts `related`, `rejected`, `unresolved` et `quarantined`. 25 structures portent des `relatedRefs` documentaires, 2 structures conservent chacune une référence explicitement rejetée (RC-014 et RC-017), et le seul vrai problème d'identité encore non résolu est R-077, déjà quarantiné. Aucun H-ID nouveau, aucun GAP assigné, corpus religieux et `index.html` inchangés.


## V75 — clôture rétrospective de l’audit V12
Les 11 familles `highConfidenceParallelFamilies` encore marquées `PENDING_SOURCE_BY_SOURCE_CONSOLIDATION` dans l’audit historique V12 sont désormais explicitement rapprochées du registre canonique V44 : 9 convergent vers un seul RC et 2 ont été scindées par les audits ultérieurs. Le fichier V12 reste inchangé. Aucun H-ID nouveau, aucun GAP assigné, corpus religieux et `index.html` inchangés.

# V74 — clôture structurelle du registre UM

- Audit du registre historique `UM-001..UM-010` contre la consolidation canonique V44.
- 10/10 candidats UM déjà représentés structurellement dans RC-005/028/029/030/042/047/048/068.
- 0 candidat UM résiduel, 0 H-ID historique récupéré, 0 GAP assigné.
- Les UM-ID restent techniques et ne sont jamais promus en H-ID.
- Détail : `docs/AUDIT-HADITH-UNMAPPED-CLOSURE-V74.txt` et `data/religious-library-hadith-unmapped-closure-audit-v1.json`.

# V73 — audit des indices textuels hadith non structurés

- 72 fichiers textuels historiques/éditoriaux ciblés inspectés.
- 217 lignes candidates détectées et classées : 71 dans les rapports hadith déjà structurés, 136 dans le runtime/historique HTML (Qur’an/interface), 9 dans l’ancienne UI React, 1 mention technique.
- 0 fragment hadith orphelin avec provenance exploitable; 0 nouveau H-ID; 0 GAP assigné.
- 69/140 structures hadith matérialisées; 71 GAP inchangés; R-077 quarantiné.
- `index.html` inchangé; `full183ObjectSerialization=PENDING`; `productionReady=false`.
- Détail : `docs/AUDIT-HADITH-TEXTUAL-CLUES-V73.txt`.

# V71 — archéologie de provenance hadith

- Audit exhaustif des références hadith dans l'historique embarqué : 140 fichiers inspectés, 145 références distinctes.
- 144/145 sont déjà représentées dans les registres actuels.
- L'unique référence résiduelle, Bukhari 6499, est l'ancienne référence erronée de R-065 déjà corrigée vers Bukhari 6491.
- 0 nouvelle identité religieuse récupérée; 69/140 structures hadith matérialisées; 71 GAP inchangés; R-077 quarantiné.
- `index.html` inchangé; `full183ObjectSerialization=PENDING`; `productionReady=false`.
- Détail : `docs/AUDIT-HADITH-PROVENANCE-V71.txt`.

# ÉTAT DU PROJET — V46

## Dernière consolidation
- 56 structures canoniques confirmées au total.
- 67/82 R-ID absorbés; 17 restent à consolider.
- V32: R-051, R-052 et R-053 traités séparément.
- R-052: Sahih al-Bukhari 6022 confirmé; correction du résumé interne, pas de correction de référence.
- Traduction française publiée/provenancée: PENDING.
- `productionReady`: false.
- `index.html`: inchangé; ne pas migrer encore.

# ÉTAT DU PROJET — Jardin du Cœur

Date de consolidation : 12 septembre 2026

Ce ZIP consolide **les fichiers réellement produits dans cette conversation**, en prenant comme base la dernière PWA matérielle disponible puis en y intégrant le `index.html` le plus récent. Il ne reconstruit pas une nouvelle application à partir de souvenirs ou de descriptions.

## TERMINÉ

- PWA autonome à la racine : `index.html`, `manifest.webmanifest`, `sw.js`, icônes 192/512/maskable.
- Installation PWA et enregistrement du service worker.
- Stockage local (`localStorage`) et export/import JSON du journal.
- Écrans et logique locale pour Aujourd’hui, journal/historique, duʿā’ personnelles, cycle, muhāsabah, profil et thème.
- Mode cycle avec adaptation de l’affichage des prières.
- Date grégorienne et date hégirienne indicative.
- Accueil le plus récent avec : humeur `Lourd · Fragile · Paisible · Heureux · Reconnaissant`, intention, inspiration neutre, lien muhāsabah, ambiance quotidienne, parole du jour déterministe.
- Version PWA affichée : **1.2.0** ; cache service worker : `jardin-du-coeur-v1.2.0`.
- Vérification de consolidation : le dernier `index.html` conserve tous les IDs et toutes les fonctions nommées de la version PWA immédiatement précédente, puis ajoute les éléments de l’accueil finalisé.
- Les ressources visuelles réellement créées/importées utiles au projet sont conservées dans `assets/` ; plusieurs snapshots intermédiaires utiles sont conservés dans `historique/`.

## PARTIELLEMENT TERMINÉ

- Bibliothèque religieuse **implémentée dans le code actuel** : 30 citations Qurʾān dans `DAILY_QUOTES`, extraites sans réécriture vers `data/religious-library-implemented.json`.
- Le registre religieux cible a été audité dans la conversation à **183 entrées canoniques = 140 hadiths + 43 dossiers Qurʾān**, mais ce registre complet n’a jamais été matérialisé sous forme d’un fichier contenant les 183 objets complets.
- La standardisation Qurʾān cible est QuranEnc / Muhammad Hamidullah V1.0.2 (02/07/2025), mais le code actuel des 30 citations utilise encore des liens Quran.com et un schéma provisoire.
- Les règles de sécurité éditoriale, de comptage et d’éligibilité `randomHome` ont été définies et sont documentées dans `data/religious-library-target-manifest.json`, mais elles ne sont pas encore appliquées à un fichier complet de 183 objets.
- Le projet React/Vite historique est conservé dans `source-react/`, mais il est moins avancé que le `index.html` autonome final et n’a pas été resynchronisé avec toutes les évolutions tardives.

## PENDING

- Matérialiser les **183 objets religieux complets** avec textes, arabe si retenu, traduction française, références, variantes/parallèles, thèmes, contexte, flags de sécurité, `homeEligibility`, `randomHome`, `verified`, `productionReady`.
- Exécuter un validateur sur ces 183 objets matériels et obtenir un vrai `PASS` : 183 canonical / 140 H / 43 Q / 0 doublon invalide / 0 relation invalide.
- Remplacer le `DAILY_QUOTES` provisoire par la bibliothèque de production auditable.
- Revalider chaque `homeExcerpt` contre son texte canonique et sa source.
- Décider et implémenter la politique définitive de provenance française des hadiths.
- Tester la PWA installée sur hébergement HTTPS réel, y compris cache/offline et mise à jour du service worker.
- Réconcilier ou abandonner officiellement le projet React/Vite historique au profit de la version autonome.
- Vérification juridique du nom/marque avant commercialisation (INPI/EUIPO).

## NON COMMENCÉ / NON MATÉRIALISÉ

- Aucun backend, compte utilisateur ou synchronisation cloud.
- Aucun moteur automatique de classification fiqh des menstruations ; volontairement non implémenté.
- Aucun score de foi, streak, niveau spirituel ou diagnostic religieux ; ces mécanismes sont explicitement exclus.
- Le corpus religieux complet n’est pas encore un module `quotes.ts/json` de production.

## IMPORTANT POUR LA PROCHAINE CONVERSATION

1. Utiliser **le `index.html` à la racine** comme version fonctionnelle la plus récente.
2. Ne pas considérer `source-react/` comme plus récent que cette version autonome.
3. Ne pas prétendre que les 183 entrées sont déjà dans le ZIP : 30 citations provisoires sont présentes dans le code et 30 dossiers Qurʾān matérialisés depuis les entrées présentes dans index.html.
4. Continuer la matérialisation du corpus à partir de sources vérifiées, sans reconstituer les textes manquants de mémoire.
5. Lancer `python tools/validate_project.py` après toute modification structurante.


## Reprise bibliothèque — état vérifié
- 30 dossiers Qurʾān matérialisés depuis les entrées réellement présentes dans `index.html`.
- Cible historique: 43 dossiers Qurʾān.
- Les 13 dossiers supplémentaires ne sont pas identifiables dans le paquet actuel; aucune référence n’est inventée.


## Mise à jour registre Qurʾān canonique — 11 septembre 2026

- `data/religious-library-quran-canonical.json` matérialise désormais **Q-001 → Q-043 (43/43)** selon le journal de transmission récupéré.
- Q-008 regroupe 94:5–6 en une entrée canonique.
- Q-027 couvre 89:27–30 en une entrée canonique.
- Les citations provisoires 28:24 et 33:3 restent dans l’ancien historique/accueil mais ne font pas partie du registre Q-001 → Q-043.
- `index.html` n’a pas été remplacé : migration vers le corpus canonique seulement après validation des 183 entrées.
- Validation structurelle dédiée : `docs/VALIDATION-QURAN-43.txt`.


## Hadiths récupérés — tranche certaine

- 13 correspondances H-ID exactes matérialisées dans `data/religious-library-hadith-recovered.json`.
- Références primaires revérifiées.
- Texte français canonique : PENDING (provenance/politique de traduction française à verrouiller).
- `productionReady=false` et `randomHome=false` par prudence jusqu’à cette étape.
- 127 mappings H-ID restent NON RETROUVÉS et ne doivent pas être inventés.


## Hadiths étudiés sans H-ID récupéré

- 10 références supplémentaires du journal de transmission ont été ré-auditées et stockées comme `UM-001` à `UM-010`.
- Elles ont `countsAsEntry=false`, `canonicalHId=null`, `productionReady=false`, `randomHome=false`.
- Elles ne modifient donc pas artificiellement le compteur canonique : 13 mappings H-ID certains restent matérialisés sur 140.

## Reconstruction hadith — V1

- Nouveau registre séparé : `data/religious-library-hadith-reconstruction-v1.json`.
- 10 références documentées dans l'ancien audit ont été ré-auditées comme candidats `R-001` → `R-010`.
- Aucun ancien H-ID n'a été inventé.
- Ces candidats ont `countsAsEntry=false`, `productionReady=false`, `randomHome=false`.
- Deux familles de relations sont documentées sans fusion de matn.
- Le compteur canonique certain reste 13/140 hadiths récupérés.
- Étape bloquante pour publication : provenance d'une traduction française publiée ou politique éditoriale explicite.

## Reconstruction hadith — V2

- 8 nouveaux candidats vérifiés ajoutés : R-011 → R-018.
- Registre de remplacement : 18 candidats audités sur 127 places à reconstruire.
- Ancien registre : toujours seulement 13 H-ID récupérés sur 140 ; 127 mappings anciens restent perdus.
- Aucun candidat de reconstruction n'est compté comme ancien H-ID.
- Tous restent `productionReady=false` jusqu'à verrouillage de la provenance française.

## Reconstruction hadith — V3

- 10 nouveaux candidats R-019 → R-028 ajoutés.
- Registre de reconstruction : 28 candidats bruts.
- 99 places brutes restent sur les 127 mappings perdus, mais ce chiffre n'est pas encore canonique car des parallèles doivent être dédupliqués.
- Familles de parallèles explicitement marquées pour éviter le double comptage.
- Ancien registre inchangé : 13 H-ID certains / 140 ; 127 anciens mappings restent non retrouvés.

## Reconstruction hadith — V4

- 10 candidats supplémentaires R-029 → R-038.
- Total brut de reconstruction : 38 candidats.
- Places brutes restantes : 89, avant déduplication.
- Trois nouvelles familles de relations marquées pour empêcher le double comptage.
- Ancien registre toujours inchangé : 13 H-ID récupérés, 127 mappings anciens non retrouvés.

## Reconstruction hadith — V5

- 6 candidats R-039 → R-044 ajoutés.
- Total brut : 44 candidats sur 127 places de reconstruction.
- Places brutes restantes : 83.
- Déduplication renforcée : colère/force, hospitalité-parole-parenté, douceur/rifq.
- Ancien registre inchangé : 13 H-ID récupérés, 127 anciens mappings non retrouvés.

## Reconstruction hadith — V6

- 7 candidats R-045 → R-051 ajoutés après vérification des références.
- Total brut : 51 candidats ; 76 places brutes restantes.
- Trois familles supplémentaires de déduplication/recouvrement documentées.
- Ancien registre inchangé : 13 H-ID récupérés ; 127 mappings historiques non retrouvés.

## Reconstruction hadith — V7

- 7 candidats R-052 → R-058 ajoutés.
- Total brut : 58 candidats ; 69 places brutes restantes.
- Trois nouvelles familles de recouvrement/parallèles documentées.
- Compteur historique inchangé : 13 H-ID récupérés / 140.

## Reconstruction hadith — V8

- 8 candidats R-059 → R-066 ajoutés.
- Total brut : 66 candidats ; 61 places brutes restantes.
- Trois nouvelles familles de parallèles/variantes documentées.
- Les hadiths liés à la maladie conservent des garde-fous explicites contre diagnostic, promesse de guérison et minimisation de douleur.
- Ancien registre inchangé : 13 H-ID récupérés / 140 ; 127 mappings historiques non retrouvés.


## Reconstruction hadith — V9

- 8 candidats R-067 → R-074 ajoutés.
- Total brut : 74 candidats ; 53 places brutes restantes.
- Ancien registre inchangé : 13 H-ID récupérés / 140.

## Reconstruction hadith — V10

- 8 candidats R-075 → R-082 ajoutés.
- Total brut : 82 candidats ; 45 places brutes restantes.
- Familles parole/hospitalité, rifq, liens familiaux et miséricorde renforcées.
- Ancien registre inchangé : 13 H-ID récupérés / 140.

## Reconstruction hadith — V11 — correction d'audit

- Ré-vérification ciblée des références.
- R-080 corrigé : Bukhari 5984 → Bukhari 5991 (Book 78, Hadith 22).
- R-082 corrigé : Bukhari 5991 → Bukhari 6009 (Book 78, Hadith 40).
- R-039 Bukhari 6114 et R-040 Muslim 2609a confirmés.
- Aucun nouveau candidat ajouté dans cette version : total brut inchangé à 82.
- Ancien registre inchangé : 13 H-ID récupérés / 140.

## Consolidation hadith — V12

La consolidation canonique a commencé sur la base V11 corrigée.

- 82 candidats bruts analysés.
- 30 familles de variantes/parallèles/recouvrements déjà documentées.
- 18 candidats ne sont encore rattachés à aucune famille.
- 19 candidats apparaissent dans plusieurs familles et demandent une attention particulière.
- 11 familles parallèles/variantes sont placées en priorité pour la revue source-par-source.
- Aucune fusion automatique et aucun ancien H-ID inventé.
- `index.html` reste inchangé tant que le corpus hadith canonique n'est pas suffisamment consolidé.

## Consolidation hadith — V13

Première consolidation canonique concrète :
- RC-001 : Bukhari 10 + Muslim 40.
- RC-002 : Bukhari 6114 + Muslim 2609a.
- RC-003 : Muslim 2564c + Ibn Majah 4143.
- RC-004 : Bukhari 1413 + Muslim 1016a, avec différence de contexte conservée.
- 8 candidats bruts sont ainsi structurés en 4 dossiers canoniques.
- Correction R-059 : Bukhari 5678 → Bukhari 5675.
- Aucun H-ID historique inventé et aucune migration runtime.

## Consolidation hadith — V14

- RC-005 : Muslim 1907a + Bukhari 1 — intentions/hijra.
- RC-006 : Bukhari 13 + Muslim 45a — aimer pour son frère ce que l’on aime pour soi; variante Muslim conservée.
- RC-007 : Bukhari 6018 + Muslim 47a — voisin/hospitalité/bonne parole; différence de formulation conservée.
- Total : 7 structures canoniques confirmées absorbant 14 candidats bruts.
- Correction R-057 : Bukhari 6475 → Bukhari 6478.
- Correction R-059 de V13 conservée : Bukhari 5675.
- Aucun H-ID historique inventé; aucune migration runtime.

## Consolidation hadith — V15

La consolidation touche désormais aussi les H-ID historiques réellement récupérés :
- RC-008 / H-038 : Bukhari 5027 principal + 5028 parallèle.
- RC-009 / H-043 : Bukhari 6406 + Muslim 2694.
- RC-010 / H-051 : Muslim 2723a principal + 2723b,c variantes conservées.
- RC-011 / H-095 : Bukhari 6133 + Muslim 2998a,b.
- Total : 11 structures canoniques confirmées (7 reconstruction + 4 historiques).
- Il reste 9 des 13 H-ID historiques récupérés à consolider.
- Aucun H-ID historique nouveau n'a été attribué.

## Consolidation hadith — V16

- RC-012 / H-025 : Muslim 2759a,b.
- RC-013 / H-071 : Muslim 1017e principal + 1017f/g/h variantes; contexte narratif conservé.
- RC-014 / H-074 : Bukhari 2079 principal + 2082 parallèle; 2086 explicitement rejeté; 2087/2088 liés +0.
- RC-015 / H-088 : Muslim 2865d principal + famille 2865a-d variantes.
- Total : 15 structures canoniques confirmées, dont 8 des 13 H-ID historiques récupérés.
- Il reste 5 H-ID historiques récupérés à consolider.

## Consolidation hadith — V17 — jalon historique

Les 13/13 H-ID dont la correspondance historique avait réellement été récupérée sont désormais structurés :
H-025, H-038, H-043, H-051, H-071, H-074, H-088, H-095, H-113, H-124, H-129, H-135, H-140.

Dernière passe :
- RC-016 / H-113 : Muslim 2749; 2748b lié +0.
- RC-017 / H-124 : Bukhari 6023; ancienne attribution 1016 explicitement rejetée.
- RC-018 / H-129 : Bukhari 1427/1428 = un dossier, deux routes.
- RC-019 / H-135 : Abu Dawud 4811 + Tirmidhi 1954 parallèle.
- RC-020 / H-140 : Muslim 1055.

Important : cela ne récupère pas les 127 anciennes correspondances H-ID perdues. Elles restent historiquement non récupérées.

## Consolidation hadith — V18

Reprise de la reconstruction après clôture des 13 H-ID historiques récupérés :
- RC-021 : R-057/R-058 = Bukhari 6478 + Muslim 2988, poids de la parole.
- RC-022 : R-059/R-060 = Bukhari 5675 + Muslim 2191a, invocation de guérison.
- RC-023 : R-061/R-062 = Bukhari 5641,5642 + Muslim 2573, maladie/épreuves et expiation.
- Total : 23 structures canoniques confirmées (13 historiques + 10 reconstruction).
- 20 R-ID absorbés; 62 R-ID restent hors consolidation canonique.

## Consolidation hadith — V19

- RC-024 : R-065/R-066 = Bukhari 6491 + Muslim 131a/b, inscription des intentions et actes.
- RC-025 : R-067/R-068 = Bukhari 6307 + Muslim 2702, istighfar/repentir répétés; nombres/formulations non fusionnés.
- RC-026 : R-073/R-074 = Bukhari 6369 + Bukhari 2893, invocation contre angoisse/tristesse/incapacité/dette.
- Correction R-065 : Bukhari 6499 → Bukhari 6491.
- Total : 26 structures canoniques (13 historiques + 13 reconstruction).
- 26 R-ID absorbés; 56 restent à consolider.

## Consolidation hadith — V20 — jalon familles prioritaires

Les 11/11 familles `highConfidenceParallelFamilies` identifiées dans l'audit V12 sont désormais traitées.
- RF-22 rejoint RC-023 : R-028/R-061/R-062 dédoublonnés dans le dossier maladie/épreuves/expiation.
- RF-23 rejoint RC-024 : R-001/R-002/R-065/R-066 structurés comme famille élargie intentions/inscription des actions.
- Total inchangé : 26 structures canoniques, mais couverture R-ID portée à 29/82.
- Il reste 53 R-ID hors consolidation.
- Les multiplicateurs présents dans certains textes ne doivent jamais être convertis en score, XP ou mécanique de mérite.

## Consolidation hadith — V21

Correction importante :
- RC-021 a été scindé. R-075/Bukhari 6477 correspond à R-058/Muslim 2988a,b.
- R-057/Bukhari 6478 est désormais RC-027 distinct.

Nouvelles consolidations :
- RC-028 : R-006/Bukhari 6464 + R-009/Muslim 2818a.
- RC-029 : R-007/Bukhari 6465 + R-008/Muslim 783b.
- RC-030 : R-010/Bukhari 6466 + Muslim 783a (parallèle sans R-ID).

Total : 30 structures canoniques; 35/82 R-ID absorbés; 47 restent à consolider.


## Consolidation hadith — V22

Lot source-par-source consacré à la miséricorde :
- RC-031 : R-036/Bukhari 5997 + R-034 corrigé vers Bukhari 5997 (doublon de candidat) + R-035 corrigé vers Muslim 2318a.
- RC-032 : R-017/Bukhari 6013 + R-045/Bukhari 7376, deux routes de Jarir sur la miséricorde envers les gens.
- R-034 corrigé : Bukhari 6011 → Bukhari 5997.
- R-035 corrigé : Muslim 2319a → Muslim 2318a.
- R-077 : la référence Bukhari 6014 est incompatible avec son résumé; mismatch documenté, mais aucune référence de remplacement n’est inventée.
- Total : 32 structures canoniques; 40/82 R-ID absorbés; 42 restent à consolider.
- Traduction française publiée : PENDING; `productionReady=false`; `index.html` inchangé.

## Consolidation hadith — V23

Lot source-par-source consacré à la douceur / rifq :
- RC-033 : R-037 corrigé de Bukhari 6035 vers Bukhari 6024.
- RC-034 : R-038 corrigé de Muslim 2593 vers Muslim 2594a.
- RC-035 : R-078 corrigé de Muslim 2592a vers Muslim 2593.
- RC-036 : R-079 corrigé de Muslim 2594a vers Muslim 2592a.
- Les quatre textes restent des structures distinctes : proximité thématique documentée via `relatedRefs`, sans fusion parallèle non prouvée.
- Recomptage de contrôle : la V22 contenait bien 40/82 R-ID distincts absorbés; aucune correction de compteur V22 n’est nécessaire.
- Total V23 : 36 structures canoniques; 44/82 R-ID absorbés; 38 restent à consolider.
- Traduction française publiée : PENDING; `productionReady=false`; `index.html` inchangé.


## Consolidation hadith — V24

Lot source-par-source consacré à l’hospitalité / voisin / parole :
- RC-037 : R-042/Bukhari 6136 + R-076/Muslim 47b, routes parallèles d’Abu Hurayra sur le voisin, l’invité et la parole bonne ou le silence.
- RC-038 : R-041/Bukhari 6138 reste distinct : même formulaire général, mais la clause centrale porte sur les liens de parenté au lieu du voisin; relation documentée via `relatedRefs`.
- Aucune correction de référence n’a été nécessaire dans ce lot.
- Total V24 : 38 structures canoniques; 47/82 R-ID absorbés; 35 restent à consolider.
- Traduction française publiée : PENDING; `productionReady=false`; `index.html` inchangé.


## Consolidation hadith — V27

Lot source-par-source consacré aux liens familiaux et à la miséricorde envers les animaux :
- RC-039 : R-080/Bukhari 5991, maintien des liens lorsqu’ils ont été rompus par les proches.
- RC-040 : R-081/Muslim 2558a, maintien des liens malgré rupture et mauvais comportement; lié à RC-039 mais non fusionné comme parallèle.
- RC-041 : R-082/Bukhari 6009, récit de l’homme donnant à boire à un chien assoiffé; correction V11 confirmée.
- Aucune nouvelle correction de référence dans ce lot.
- Total V27 : 46 structures canoniques; 57/82 R-ID absorbés; 32 restent à consolider.
- Traduction française publiée : PENDING; `productionReady=false`; `index.html` inchangé.


## V27 — consolidation ṣadaqah / bonnes actions
- RC-046 : R-049 (Bukhari 2989) + R-050 (Bukhari 2891) + R-054 (Muslim 1009).
- Vérification source par source : trois routes d’Abu Hurayra; Bukhari 2989 et Muslim 1009 ont le même noyau détaillé, Bukhari 2891 en donne une route apparentée plus courte.
- Aucune correction de référence requise.
- Bilan : 57/82 R-ID absorbés; 25 restent à consolider; 46 structures canoniques confirmées (33 reconstruction + 13 historiques).
- Traduction française publiée : PENDING; productionReady: false.
- index.html : non modifié.


## V28 — consolidation intentions / inscription des actes
- Audit arithmétique: V27 annonçait 57/82 R-ID absorbés, mais le recomptage des R-ID distincts réellement membres des structures V27 donne 54/82. Correction explicite, sans supposition.
- RC-047: R-001 / Sahih Muslim 130, vérifié.
- RC-048: R-002 / Sahih Muslim 131a, vérifié.
- RC-047 et RC-048 restent distincts: Muslim 130 et 131a diffèrent substantiellement sur le traitement d’une mauvaise intention non réalisée; relation `relatedRefs`, pas `parallelRefs`.
- Nouveau bilan vérifié: 56/82 R-ID absorbés; 26 restants; 48 structures canoniques = 35 reconstruction + 13 historiques.
- Traduction française publiée: PENDING. `productionReady`: false.
- `index.html`: non modifié.


## V29 — consolidation dhikr / tahlil / tasbih
- RC-049: R-070 / Sahih Muslim 2691 + R-069 / Bukhari 6405 + R-072 / Bukhari 3293. Muslim 2691 contient les deux volets retrouvés séparément dans les routes Bukhari; consolidation comme routes parallèles d’un dossier composite.
- RC-050: R-071 / Sahih Muslim 2692 reste distinct: même formule de tasbih, mais matin/soir, mérite formulé différemment et chaîne différente; relation `relatedRefs`, pas `parallelRefs`.
- Aucune correction de référence requise.
- Nouveau bilan vérifié: 60/82 R-ID absorbés; 22 restants; 50 structures canoniques = 37 reconstruction + 13 historiques.
- Traduction française publiée: PENDING. `productionReady`: false.
- `index.html`: non modifié.

## V30 — consolidation rifq restante
- RC-033 est enrichi par R-043 / Sunan Ibn Majah 3689 comme route parallèle de Bukhari 6024 : Aishah → Urwah → al-Zuhri et même formule centrale sur la douceur dans toute affaire; le contexte narratif de Bukhari reste conservé.
- RC-051 : R-044 / Sunan Ibn Majah 3688 reste distinct. Le texte est proche de Muslim 2593 mais vient d’Abu Hurayra, avec chaîne différente; relation `relatedRefs`, pas `parallelRefs`.
- Aucune correction de référence requise dans ce lot.
- Nouveau bilan vérifié : 62/82 R-ID absorbés; 20 restants; 51 structures canoniques = 38 reconstruction + 13 historiques.
- Traduction française publiée : PENDING. `productionReady`: false.
- `index.html`: non modifié.


## V32 — oppression / fraternité
- RC-055 : R-018 / Bukhari 2444; Bukhari 2443 parallèle +0.
- RC-056 : R-025 / Muslim 2580; Bukhari 2442 parallèle +0.
- RC-055 et RC-056 restent distincts; relation thématique seulement.
- Bilan vérifié : 67/82 R-ID absorbés; 15 restants; 56 structures canoniques (43 reconstruction + 13 historiques).
- `index.html` non modifié; traduction française PENDING; `productionReady: false`.

## V33 — vie / santé / entraide-connaissance
- RC-057 : R-063 / Bukhari 6416, étranger ou voyageur dans ce monde.
- RC-058 : R-064 / Bukhari 6412, santé et temps libre; distinct de RC-057, `relatedRefs` seulement.
- RC-059 : R-016 / Muslim 2699a, hadith composite entraide / difficulté / connaissance / étude du Qur’an; distinct de RC-056.
- Aucune correction de référence requise dans ce lot.
- Bilan vérifié : 70/82 R-ID absorbés; 12 restants; 59 structures canoniques (46 reconstruction + 13 historiques).
- `index.html` non modifié; traduction française PENDING; `productionReady: false`.

## V34 — amour du Messager / douceur de la foi
- RC-060 : R-031 / Bukhari 15; Muslim 44b enregistré comme route parallèle +0.
- RC-061 : R-032 / Bukhari 16; Muslim 43a, Muslim 43b et Bukhari 6041 enregistrés comme routes parallèles +0.
- RC-060 et RC-061 restent distincts : recoupement doctrinal, mais textes canoniques différents; `relatedRefs` seulement entre les dossiers.
- Aucune correction de référence requise dans ce lot.
- Bilan vérifié : 72/82 R-ID absorbés; 10 restants; 61 structures canoniques (48 reconstruction + 13 historiques).
- `index.html` non modifié; traduction française PENDING; `productionReady: false`.


## V35 — licite/douteux / compréhension religieuse / facilité dans l’enseignement
- RC-062 : R-020 / Bukhari 52; Muslim 1599a et 1599d comme routes parallèles +0.
- RC-063 : R-021 / Bukhari 71; Bukhari 3116 et 7312 comme routes parallèles +0.
- RC-064 : R-022 / Bukhari 69; Bukhari 6125 comme route parallèle +0.
- Aucune correction de référence requise dans ce lot.
- Bilan vérifié : 75/82 R-ID absorbés; 7 restants; 64 structures canoniques (51 reconstruction + 13 historiques).
- `index.html` non modifié; traduction française PENDING; `productionReady: false`.

## V36 — consolidation fraternité / orgueil / naṣīḥa
- Correction arithmétique: recomptage direct de V35 = 76/82 R-ID absorbés (et non 75/82); 6 restaient avant V36.
- RC-065: R-026 / Muslim 2564a; Bukhari 6064 et 6066 recoupements de route +0; dossier distinct de RC-056.
- RC-066: R-027 / Muslim 91a; Muslim 91b variante +0.
- RC-067: R-033 / Muslim 55a; Muslim 55b et 55c parallèles explicites +0.
- Bilan V36: 79/82 R-ID absorbés; 3 restants; 67 structures = 54 reconstruction + 13 historiques.
- Traduction française publiée: PENDING. productionReady: false. index.html inchangé.

## V37 — disponibilité / deuil / dernier mismatch historique
- RC-068 : R-005 / Muslim 2326; disponibilité du Prophète ﷺ envers une femme décrite dans la transmission comme ayant une difficulté mentale; contexte conservé sans diagnostic moderne.
- RC-069 : R-046 / Bukhari 7377; Bukhari 1284 et Muslim 923a sont des routes parallèles du même récit d’Usama b. Zayd sur l’enfant mourant, les larmes et la miséricorde.
- R-077 reste non consolidé : Bukhari 6014 est vérifié mais traite de la recommandation de Jibril concernant le voisin; il ne correspond pas au résumé hérité sur la miséricorde envers les créatures. Aucun remappage n’est inventé.
- Bilan V37 : 81/82 R-ID absorbés; 1 restant (R-077); 69 structures = 56 reconstruction + 13 historiques.
- Traduction française publiée : PENDING. `productionReady`: false. `index.html` inchangé.

## V38 — audit terminal R-077 / quarantaine explicite
- R-077 reste non consolidé après audit ciblé : l’ancienne référence Bukhari 6014 traite du voisin et ne concorde pas avec son résumé hérité sur la miséricorde.
- Bukhari 7376 concorde thématiquement, mais il est déjà la référence vérifiée de R-045; aucune donnée récupérée ne prouve que R-077 soit un doublon de R-045.
- Tirmidhi 1924 est également thématiquement proche, mais son narrateur et son contenu développé ne fournissent aucune preuve d’identité avec R-077.
- Disposition : `REFERENCE_MISMATCH_UNRESOLVED_QUARANTINED`. Aucun remappage conjectural.
- Bilan V38 : 81/82 R-ID absorbés; 1 quarantiné (R-077); 69 structures = 56 reconstruction + 13 historiques.
- Traduction française publiée : PENDING. `productionReady`: false. `index.html` inchangé.


## V39 — audit de cohérence RC-023 / R-028
- Correction structurelle sans nouvelle entrée : R-028 est désormais explicitement inscrit dans `parallels` de RC-023, conformément à son statut déjà documenté de chevauchement/membre du dossier.
- Correction de métadonnée : R-028 `inBookReference` passe de Book 75, Hadith 1 à Book 75, Hadith 2; `primaryRef` reste Sahih al-Bukhari 5641.
- Le recomptage strict limité à `primary` + `parallels` donne 81/82; seul R-077 reste quarantiné.
- Bilan V39 : 69 structures = 56 reconstruction + 13 historiques. `index.html` inchangé.


## V40 — clôture contrôlée de la reconstruction
- Audit final de R-077 : Bukhari 6014 est confirmé comme hadith sur le voisin; il reste incompatible avec le résumé hérité de R-077.
- Bukhari 7376 correspond au thème de la miséricorde envers les gens mais est déjà affecté à R-045; aucune preuve ne permet d’identifier R-077 à ce dossier.
- Phase de reconstruction close avec exception documentée : 81/82 R-ID absorbés, R-077 quarantiné, 69 structures = 56 reconstruction + 13 historiques.
- Aucun remappage conjectural; `publishedFrenchTranslation=PENDING`; `productionReady=false`; `index.html` inchangé.


## V41 — audit de couverture du corpus cible
- Aucun nouveau hadith ni H-ID n’est créé : la phase de consolidation du registre R reste close avec R-077 en quarantaine.
- Couverture hadith structurelle vérifiée : 69/140 structures canoniques confirmées; déficit de 71 vers la cible.
- Avec les 43/43 dossiers Qur’an constitués, couverture structurelle globale : 112/183; déficit global de 71, entièrement côté hadith.
- R-077 reste non remappé : Bukhari 6014 concerne le voisin; Bukhari 7376 correspond au thème hérité mais est déjà affecté à R-045.
- `publishedFrenchTranslation=PENDING`; `productionReady=false`; `index.html` inchangé.


## V42 — réconciliation du manifeste de couverture
- Aucun nouveau hadith, R-ID ou H-ID n’est créé.
- Correction de `data/religious-library-target-manifest.json` : suppression de l’ancien libellé ambigu « 140/140 audité/fermé dans la conversation ».
- État désormais explicite : 69/140 structures hadith confirmées; 71 non matérialisées.
- Registre de reconstruction : 81/82 R-ID absorbés; R-077 seul quarantiné.
- Historique : 13 H-ID récupérés/consolidés; 127 anciens mappings non récupérés et jamais inventés.
- Qur’an : 43/43 dossiers constitués; couverture structurelle globale 112/183.
- `full183ObjectSerialization=PENDING`; `publishedFrenchTranslation=PENDING`; `productionReady=false`; `index.html` inchangé.


## V43 — registre explicite des 71 lacunes hadith
- Création de `data/religious-library-hadith-coverage-gaps-v1.json` avec 71 identifiants administratifs `GAP-001` à `GAP-071`.
- Ces GAP-ID ne sont ni des H-ID, ni des R-ID, ni des identités religieuses : aucune référence, aucun matn, aucun narrateur n’est inféré.
- Couverture inchangée : 69/140 structures hadith confirmées; 71 non matérialisées; 43/43 dossiers Qur’an; 112/183 global.
- Registre R inchangé : 81/82 absorbés; R-077 quarantiné et séparé des GAP-ID.
- `publishedFrenchTranslation=PENDING`; `productionReady=false`; `index.html` inchangé.


## V44 — ledger de couverture hadith
- Cible administrative : 140 positions.
- 69 positions pointent vers RC-001..RC-069 confirmés.
- 71 positions pointent vers GAP-001..GAP-071, identité inconnue.
- Couverture religieuse matérialisée : 69/140, inchangée.
- Couverture comptable du ledger : 140/140 positions tracées.
- R-077 : quarantaine non résolue; aucune promotion.
- `productionReady`: false.

## V45 — durcissement de validation
- Aucun nouveau hadith n’est créé.
- Les invariants de couverture sont désormais vérifiés directement par `tools/validate_project.py`.
- Validation attendue et obtenue : 52/52 PASS.
- Couverture religieuse matérialisée inchangée : 69/140 hadiths; 43/43 dossiers Qur’an; 112/183 structures.
- Ledger administratif : 140/140 positions = 69 RC + 71 GAP inconnus.
- Reconstruction : 81/82 R-ID absorbés; R-077 reste quarantiné/non absorbé.
- `publishedFrenchTranslation=PENDING`; `productionReady=false`.
- `index.html` non modifié.

## V46 — validation globale de couverture
- Validation automatique de Q-001..Q-043 : 43 dossiers.
- Validation des pointeurs exacts du ledger hadith : RC-001..RC-069 puis GAP-001..GAP-071.
- Validation de l’exclusivité canonicalId/gapId par position.
- Validation globale : 112/183 structures matérialisées, 71 lacunes hadith administratives, R-077 toujours quarantiné.
- Aucun texte religieux ajouté; `index.html` inchangé.


## V47 — snapshot d’intégrité du corpus
- Aucun nouveau hadith, H-ID, R-ID, narrateur, matn ou référence n’est créé.
- Ajout de `data/religious-library-corpus-integrity-v1.json`.
- Le snapshot fige : 43 dossiers Qur’an, 69 structures hadith, 71 GAP, 140 positions hadith, 112/183 structures matérialisées, 81 R-ID absorbés et R-077 quarantiné.
- SHA-256 enregistrés pour les fichiers religieux critiques, le manifeste cible et `index.html`.
- Le validateur recalcule les empreintes pour détecter toute modification non réconciliée.
- `full183ObjectSerialization=PENDING`; `productionReady=false`; `index.html` inchangé.


## V48 — provenance de release et continuité vérifiable
- Aucun contenu religieux n’est ajouté ni modifié.
- Ajout de `data/religious-library-release-provenance-v1.json` pour lier V48 à l’archive V47 par SHA-256.
- La provenance fige aussi le SHA-256 de `index.html`, celui de `historique/07-index-final-consolide.html` et leur égalité.
- Le snapshot d’intégrité passe à V48 et protège désormais également le fichier de provenance.
- Couverture inchangée : 43 dossiers Qur’an, 69 structures hadith, 71 GAP, 112/183 matérialisés, 81/82 R-ID absorbés, R-077 quarantiné.
- `full183ObjectSerialization=PENDING`; `productionReady=false`; runtime inchangé.


## V49 — reproductibilité et inventaire des fichiers critiques
- Ajout de `data/religious-library-release-file-inventory-v1.json`.
- L’inventaire enregistre chemins, tailles et SHA-256 d’un ensemble stable d’entrées critiques de la release; il exclut ses propres métadonnées récursives.
- La provenance relie V49 à l’archive V48 par SHA-256 et référence l’inventaire V49.
- Le corpus religieux reste inchangé: 43 Qur’an, 69 hadiths matérialisés, 71 GAP, 81/82 R-ID absorbés, R-077 quarantiné.
- `index.html` non modifié; `full183ObjectSerialization: PENDING`; `productionReady: false`.


## V50 — contrat de build reproductible
- Aucun contenu religieux ajouté ou modifié.
- Ajout de `data/religious-library-release-build-v1.json` : 9 phases ordonnées, frontières de hash non récursives et politiques runtime/religieuses explicites.
- Provenance V50 → V49 et snapshot/intégrité synchronisés.
- Couverture inchangée : 43 Qur’an + 69 hadith = 112/183 ; 71 GAP ; 81/82 R-ID absorbés ; R-077 quarantiné.


## V51 — attestation d’écart de release
V51 ajoute `data/religious-library-release-delta-v1.json` pour attester par SHA-256 que les 7 entrées corpus/runtime stables sont identiques à V50. Aucun contenu religieux n’est ajouté ni remappé. R-077 reste quarantiné. Le runtime `index.html` reste inchangé.


## V52 — contrôle de cohérence de release
Ajout d’un contrat administratif de cohérence entre les métadonnées de release. Aucun contenu religieux n’est ajouté ou remappé; `index.html` reste inchangé; `productionReady=false`.

## V53 — index global de couverture 183
- Création de `data/religious-library-corpus-coverage-ledger-v1.json` avec exactement 183 positions administratives.
- Positions 001..043 : pointeurs exacts vers Q-001..Q-043.
- Positions 044..183 : miroir exact des 140 positions hadith, soit 69 RC confirmés + 71 GAP inconnus.
- Aucun GAP n’acquiert d’identité religieuse, référence, narrateur, matn, H-ID ou R-ID par cette opération.
- L’index rend la couverture globale vérifiable mais `full183ObjectSerialization` reste `PENDING` tant que les 71 hadiths manquants ne sont pas réellement identifiés.
- Couverture religieuse : 43 Qur’an + 69 hadith = 112/183; reconstruction 81/82 avec R-077 quarantiné; `productionReady=false`; `index.html` inchangé.


## V54 — contrat structurel des données
- Ajout de `data/religious-library-data-contract-v1.json`.
- Le contrat décrit les fichiers JSON critiques, champs de premier niveau requis, tailles de collections, motifs/séquences Q/RC/GAP/coverage et équations de couverture.
- Il est strictement administratif : aucune identité religieuse, référence, narrateur, matn, H-ID ou R-ID n’est inféré.
- Couverture religieuse inchangée : 43 Qur’an + 69 hadith = 112/183; 71 GAP; 81/82 R-ID absorbés; R-077 quarantiné.
- `full183ObjectSerialization=PENDING`; `productionReady=false`; `index.html` inchangé.
- Validation V54 renforcée : 164/164 PASS.


## V55 — intégrité référentielle
V55 ajoute `data/religious-library-referential-integrity-v1.json` pour vérifier la résolution des Q-ID, RC-ID, GAP-ID, positions de couverture et R-ID. Le validateur renforcé passe 175/175. Aucun contenu religieux n’est ajouté ni remappé; R-077 reste quarantiné; `full183ObjectSerialization=PENDING`; `productionReady=false`.


## V57 — hygiène du paquet
Le corpus reste inchangé (43 Qur’an, 69 structures hadith, 71 GAP; 112/183 matérialisés; 81/82 R-ID absorbés, R-077 quarantiné). V57 ajoute un contrat d’hygiène du paquet et exclut les caches/artefacts temporaires de la release. `index.html` reste inchangé.


## V58 — intégrité JSON
Ajout de `data/religious-library-release-json-integrity-v1.json` et validation de tous les `data/*.json` : UTF-8, JSON strict, absence de clés dupliquées et forme racine objet/tableau. Aucun contenu religieux ni runtime modifié.


### V58
Contrat de stabilité sémantique JSON ajouté. Corpus religieux inchangé : 43 Qur’an + 69 hadith = 112/183 ; 71 GAP ; 81/82 R-ID absorbés ; R-077 quarantiné.


## V59 — intégrité sémantique canonique
V59 ajoute des empreintes JSON canoniques pour six entrées stables afin de distinguer une modification logique d’un simple reformatage. Aucun contenu religieux ni runtime n’est modifié.

Validation V59 : 214/214 contrôles PASS ; 6 empreintes sémantiques canoniques vérifiées ; corpus religieux et index.html inchangés.


## V60 — exhaustivité du paquet
- Ajout de `data/religious-library-release-archive-fileset-v1.json` : ensemble exhaustif des chemins de fichiers réguliers attendus dans la release.
- Toute omission ou tout fichier inattendu fait échouer le validateur.
- Corpus religieux inchangé : 43 dossiers Qur’an, 69 structures hadith, 71 GAP; 112/183 matérialisés.
- 81/82 R-ID absorbés; R-077 reste quarantiné.
- `full183ObjectSerialization=PENDING`; `productionReady=false`; `index.html` inchangé.

## V61 — ZIP reproductible
La V61 ajoute `tools/build_release_zip.py` et `data/religious-library-release-zip-reproducibility-v1.json`. Le ZIP est construit depuis le file-set exact, dans un ordre lexicographique, avec horodatage et métadonnées ZIP normalisés. Deux builds réalisés dans la chaîne déclarée doivent produire exactement le même SHA-256. Aucune identité religieuse n’est ajoutée; 43 dossiers Qur’an + 69 structures hadith = 112/183 matérialisées, 71 GAP restent administratifs, R-077 reste quarantiné.

## V62 — preuve externe de reproductibilité

V62 ajoute `data/religious-library-release-reproducibility-attestation-v1.json` et `tools/verify_release_reproducibility.py`. Deux archives déterministes indépendantes sont reconstruites puis comparées par SHA-256 et liste d’entrées. Le rapport observé est volontairement externe au ZIP afin d’éviter une auto-référence cryptographique. Aucun contenu religieux, H-ID, R-ID, RC-ID, GAP-ID ni `index.html` n’est modifié.


## V66 — audit contrôlé des GAP (lot 1)
- GAP-001..GAP-010 audités contre les matériaux locaux.
- 0 identité religieuse récupérée: aucun H-ID, R-ID, référence, narrateur ou matn propre à ces GAP.
- Les 10 GAP restent `UNMATERIALIZED_IDENTITY_UNKNOWN`; aucune correspondance externe arbitraire n’est créée.
- Corpus inchangé: 43 Qur’an + 69 hadith = 112/183 matérialisés; 71 GAP; R-077 quarantiné.


## V66 — audit GAP
Audit cumulatif GAP-001..GAP-060 : 50 GAP audités, 0 identité religieuse récupérée; aucun contenu religieux inventé.


## V70 — clôture de l’audit local des 71 GAP
- GAP-071 audité contre les matériaux locaux : aucune référence, H-ID, R-ID, narrateur ou matn propre permettant une identité sûre.
- Audit cumulatif terminé : GAP-001..GAP-071, 71/71 positions auditées, 0 identité religieuse récupérée sans preuve.
- Corpus inchangé : 43 Qur’an + 69 structures hadith = 112/183 matérialisées; 71 GAP restent d’identité inconnue; R-077 reste quarantiné.
- `full183ObjectSerialization=PENDING`; `productionReady=false`; `index.html` inchangé.


## V72 — audit des indices H-ID historiques
- 147 fichiers non-métadonnées de release inspectés.
- 14 chaînes H-ID distinctes trouvées : les 13 H-ID historiquement récupérés + H-001.
- H-001 apparaît uniquement comme borne générique de la plage « H-001…H-140 » dans le registre UM et sa validation; aucun contenu religieux ne lui est rattaché.
- Nouveaux mappings H-ID récupérés : 0. GAP assignés : 0.
- Corpus inchangé : 43/43 Qur’an, 69/140 hadiths, 71 GAP, 112/183 matérialisés.
- R-077 reste quarantiné; full183ObjectSerialization=PENDING; productionReady=false; index.html inchangé.


## V77 — audit de provenance ciblé de R-077
L’unique reliquat d’identité reste R-077. La référence héritée Bukhari 6014 demeure invalidée par son contenu sur le voisin. L’audit source compare également Bukhari 7376, Tirmidhi 1924 et la famille des cent miséricordes (Bukhari 6469; Muslim 2752b/c–2753a). Ces textes sont seulement thématiquement compatibles avec le résumé hérité; aucun narrateur, matn, H-ID ou indice de collection n’est conservé pour départager les candidats. Disposition inchangée : `REFERENCE_MISMATCH_UNRESOLVED_QUARANTINED`. Aucun GAP n’est assigné et aucun H-ID n’est inventé.


## V89 — intégrité des pointeurs courants
- Correction du dernier pointeur courant obsolète vers `docs/AUDIT-HADITH-UNMAPPED-CLOSURE-V75.txt` dans `release-delta`.
- Chemin autoritatif : `docs/AUDIT-HADITH-UNMAPPED-CLOSURE-V74.txt`.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — synchronisation des résumés de provenance
- Correction de cinq résumés dérivés périmés dans `release-provenance`: nombre de phases, JSON, datasets sémantiques, entrées d'archive et nom du rapport externe.
- Les contrats autoritatifs sous-jacents étaient intacts; aucun contenu religieux ni `index.html` n'est modifié.


## V89 — couverture des audits administratifs courants
- Les audits V80/V81 de chemin courant et de résumé de provenance sont désormais explicitement couverts par le graphe de cohérence, l'inventaire et l'intégrité.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — alignement des ensembles de protection
- Alignement des cibles non récursives entre inventaire sélectionné et instantané d'intégrité.
- Les fichiers qui devraient se hasher eux-mêmes restent explicitement exclus de cette exigence récursive; le ZIP déterministe couvre l'ensemble.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — sémantique explicite des `relatedRefs`
- Les 30 relations existantes sont typées dans un ledger séparé, sans modifier le corpus canonique.
- Les cibles RC explicites doivent toutes résoudre; chaque relation reste `+0` et n'autorise aucune inférence d'identité historique.
- Aucun changement de `index.html`.


## V89 — provenance contextuelle des références hadith
- Ajout d'un ledger de 14 cas: 11 corrections, 2 rejets explicites et R-077 non résolu/quarantiné.
- Une ancienne référence est marquée obsolète uniquement pour son sujet; aucune blacklist globale de numéro n'est autorisée.
- Quatre anciennes références restent légitimement actives dans un autre dossier canonique.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — sémantique croisée des références
- Audit des références réutilisées entre rôle canonique actif, `relatedRefs` et historique de correction/rejet.
- 20 références ont plusieurs contextes; 3 apparaissent dans les trois contextes.
- Le rôle d'un numéro de hadith est désormais explicitement contextuel et ne peut jamais être déduit globalement.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — clôture des pistes internes de provenance
- Les 71 GAP restent sans H-ID, R-ID, référence, narrateur ou matn exploitable.
- Aucun nouveau H-ID historique n'est récupérable depuis les matériaux actuellement présents dans le paquet.
- La prochaine récupération religieuse honnête exige un nouveau matériau historique externe (ancien export, sauvegarde, corpus source, transcript explicite, fichier d'origine).
- Les recherches thématiques ou rapprochements sémantiques ne sont pas admis comme preuve d'identité.
- Aucun changement du corpus religieux ni de `index.html`.


## V89 — nouveaux candidats hadith authentifiés
- 9 nouveaux dossiers N-001..N-009, vérifiés dans les Ṣaḥīḥayn et absents des primaryRef/parallelRefs des 69 structures actuelles.
- Ils sont des candidats de nouvelle constitution, pas des H-ID historiques récupérés.
- Aucun candidat n'est encore promu au canon; traduction française publiée toujours PENDING.
- Aucun changement de `index.html`.


## V89 — promotion des 9 nouveaux hadiths authentifiés
- N-001..N-009 sont promus dans un supplément canonique distinct du registre historique/reconstruction.
- Couverture hadith : 78/140 ; positions non matérialisées : 62.
- Couverture religieuse totale : 121/183.
- Aucun ancien H-ID n'est revendiqué pour ces nouvelles structures.
- Les GAP-001..009 sont des positions administratives remplies par de nouvelles identités, pas des identités historiques récupérées.
- Traduction française publiée toujours PENDING ; `index.html` inchangé.


## V91 — audit et promotion partielle du lot 2
- Trois descriptions V90 ont été corrigées à partir des sources : Bukhari 21, 43 et 44.
- N-010, N-012 et N-014 sont rejetés comme doublons de structures déjà canoniques.
- N-011, N-013, N-015 et N-016 sont promus comme nouvelles structures authentifiées.
- Couverture hadith : 82/140 ; 58 positions restent non matérialisées.
- Couverture religieuse totale : 125/183.
- Aucun H-ID historique n'est revendiqué; traduction française publiée toujours PENDING; `index.html` inchangé.


## V92 — troisième lot de candidats authentifiés
- 6 candidats N-017..N-022 vérifiés dans Sahih Muslim / Sahih al-Bukhari.
- Aucun n'est encore promu au canon; couverture hadith maintenue à 82/140.
- Contrôle exact des références contre les 82 structures canoniques : aucune référence active identique.
- Les comparaisons thématiques détaillées sont différées à la prochaine promotion.
- Aucun H-ID historique revendiqué; traduction française publiée toujours PENDING; `index.html` inchangé.


## V109 — vérification et promotion du lot 11
- N-048 corrigé vers Sahih al-Bukhari 6000; formulation resserrée aux mots attestés.
- N-049 corrigé vers Sahih Muslim 2751a, avec Bukhari 7404 comme parallèle vérifié.
- N-050 corrigé vers Sahih al-Bukhari 7405.
- Les trois identités sont promues comme nouvelles structures, sans ancien H-ID revendiqué.
- Couverture hadith : 105/140; 35 positions restent non matérialisées. Couverture religieuse : 148/183.
- Traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V110 — lot 12 vérifié, non canonique
- N-051 : Sahih al-Bukhari 6306.
- N-052 : Sahih Muslim 2720.
- N-053 : Sahih Muslim 2696; relation avec N-026/Muslim 2697a classée `RELATED_NOT_AUTOMATIC_PARALLEL` en raison de contextes et transmetteurs distincts.
- Aucun candidat n'est encore promu : couverture inchangée à 105/140 hadiths, 35 positions non matérialisées et 148/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V111 — promotion du lot 12
- N-051, N-052 et N-053 promus après vérification et arbitrage des relations.
- N-053 reste distinct de N-026; le lien est documentaire (`RELATED_NOT_PARALLEL`) et ne fusionne pas les deux contextes.
- Couverture hadith : 108/140; 32 positions restent non matérialisées. Couverture religieuse : 151/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V112 — lot 13 vérifié, non canonique
- N-054 : Sahih Muslim 2722.
- N-055 : Sahih Muslim 2725a.
- N-056 : Sahih al-Bukhari 6382.
- Aucun candidat n'est promu dans cette release : couverture maintenue à 108/140 hadiths, 32 positions non matérialisées et 151/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V113 — promotion du lot 13
- N-054, N-055 et N-056 promus après audit final des références et contrôle d'absence de doublon exact dans le canon courant.
- Couverture hadith : 111/140; 29 positions restent non matérialisées. Couverture religieuse : 154/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V114 — lot 14 vérifié, non canonique
- N-057 : Sahih Muslim 49a.
- N-058 : Sahih Muslim 2567a.
- N-059 : Sahih Muslim 54a.
- Aucun candidat n'est promu dans cette release : couverture maintenue à 111/140 hadiths, 29 positions non matérialisées et 154/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V115 — promotion du lot 14
- N-057, N-058 et N-059 promus après audit final des références et contrôle d'absence de doublon canonique.
- Couverture hadith : 115/140; 26 positions restent non matérialisées. Couverture religieuse : 157/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V116 — lot 15 vérifié, non canonique
- N-060 : Sahih Muslim 2577a.
- N-061 : Sahih al-Bukhari 6502.
- N-062 : Sahih Muslim 2956.
- Aucun candidat n'est promu dans cette release : couverture maintenue à 115/140 hadiths, 26 positions non matérialisées et 157/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V117 — promotion du lot 15
- N-060, N-061 et N-062 promus après audit final des références et contrôle d'absence de doublon canonique.
- Couverture hadith : 117/140; 23 positions restent non matérialisées. Couverture religieuse : 160/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V118 — lot 16 vérifié, non canonique
- N-063 : Sahih Muslim 2735a.
- N-064 : Sahih al-Bukhari 2387.
- N-065 : Sahih al-Bukhari 3470; comparaison thématique approfondie requise avant promotion.
- Aucun candidat n'est promu dans cette release : couverture maintenue à 117/140 hadiths, 23 positions non matérialisées et 160/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V119 — audit thématique et promotion du lot 16
- N-063, N-064 et N-065 promus après audit final.
- N-065 est documenté comme relié mais non dupliqué par RC-012/Muslim 2759a et RC-016/Muslim 2749.
- Couverture hadith : 120/140; 20 positions restent non matérialisées. Couverture religieuse : 163/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V120 — lot 17 vérifié, non canonique
- N-066 : Sahih Muslim 1631.
- N-067 : Sahih Muslim 1893a.
- N-068 : Sahih al-Bukhari 3461.
- Aucun candidat n'est promu : couverture maintenue à 120/140 hadiths, 20 positions non matérialisées et 163/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V121 — audit thématique et promotion du lot 17
- N-066, N-067 et N-068 promus après audit final.
- N-067 est relié mais non dupliqué par N-019; N-068 est relié mais non dupliqué par RC-008 et N-038.
- Couverture hadith : 123/140; 17 positions restent non matérialisées. Couverture religieuse : 166/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.

## V122 — lot 18 vérifié, non canonique
- N-069 : Sahih Muslim 2721a.
- N-070 : Sahih al-Bukhari 3208.
- N-071 : Sahih Muslim 2327a.
- Aucun candidat n'est promu : couverture maintenue à 123/140 hadiths, 17 positions non matérialisées et 166/183 structures religieuses.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V123 — audit thématique et promotion du lot 18
- N-069, N-070 et N-071 promus après audit final.
- N-069 est relié mais non dupliqué par N-055/Muslim 2725a.
- Couverture hadith : 117/140; 14 positions restent non matérialisées. Couverture religieuse : 169/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## Release V124 — lot candidat 19

- Trois candidats externes vérifiés : N-072 à N-074.
- Références : Sahih al-Bukhari 6018, 6412 et 6474.
- Statut : non canonique, audit final requis avant toute promotion.
- Impact canonique : +0 ; couverture inchangée à 117/140 hadiths et 169/183 structures.
- Invariants : aucun H-ID attribué, aucune traduction française publiée inventée, productionReady=false, R-077 reste quarantiné, index.html inchangé.


## V125 — audit thématique et promotion du lot 19
- N-072, N-073 et N-074 promus après audit final.
- N-072 est relié mais non dupliqué par N-035/Bukhari 6094.
- N-074 est relié mais non dupliqué par N-069/Muslim 2721a et par N-072/Bukhari 6018.
- Couverture hadith : 129/140; 11 positions restent non matérialisées. Couverture religieuse : 172/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V126 — correction du lot 19 et lot candidat 20
- Correction : N-072, N-073 et N-074 retirés du supplément; leurs références doublonnent respectivement RC-007, RC-058 et RC-044 du canon hérité.
- Couverture corrigée : 117/140 hadiths et 169/183 structures; 14 positions restent non matérialisées.
- Nouveau lot non canonique : N-075 à N-077, références Bukhari 660, 5351 et 2457; impact +0 avant audit final.
- Le contrôle anti-doublon couvre désormais le canon hérité et le supplément récent.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 et index.html inchangés.


## V127 — audit complet et promotion du lot 20
- N-075, N-076 et N-077 promus après comparaison avec le canon hérité et le supplément.
- N-075 est relié mais non dupliqué par RC-018/Bukhari 1427 et N-058/Muslim 2567a.
- N-076 est relié mais non dupliqué par RC-020/Muslim 1055.
- Couverture hadith : 129/140; 11 positions restent non matérialisées. Couverture religieuse : 172/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 historique et index.html inchangés.


## V128 — lot candidat 21
- Trois candidats externes vérifiés : N-078 à N-080.
- Références : Sahih al-Bukhari 5678, Sahih Muslim 2569 et Sahih al-Bukhari 3244.
- Contrôle exact effectué contre les 69 structures héritées et les 60 structures du supplément V127.
- Statut : non canonique, audit final requis avant toute promotion; impact +0.
- Couverture inchangée à 129/140 hadiths et 172/183 structures; 11 positions restantes.
- Aucun H-ID attribué, aucune traduction française publiée inventée, productionReady=false, R-077 historique quarantiné, index.html inchangé.


## V129 — audit complet et promotion du lot 21
- N-078, N-079 et N-080 promus après comparaison avec le canon hérité et le supplément.
- N-078 est relié mais non dupliqué par RC-023/Bukhari 5641,5642.
- N-079 est relié mais non dupliqué par N-017/Muslim 2568a.
- Couverture hadith : 132/140; 8 positions restent non matérialisées. Couverture religieuse : 175/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 historique et index.html inchangés.


## V130 — lot candidat 22
- Trois candidats externes vérifiés : N-081 à N-083.
- Références : Sahih Muslim 1955a, Sahih al-Bukhari 2072 et Sahih Muslim 1598.
- Contrôle exact effectué contre les 69 structures héritées et les 63 structures du supplément V129.
- Statut : non canonique, audit final requis avant toute promotion; impact +0.
- Couverture inchangée à 132/140 hadiths et 175/183 structures; 8 positions restantes.
- Aucun H-ID attribué, aucune traduction française publiée inventée, productionReady=false, R-077 historique quarantiné, index.html inchangé.


## V131 — audit complet et promotion du lot 22
- N-081, N-082 et N-083 promus après comparaison avec le canon hérité et le supplément.
- N-082 est relié mais non dupliqué par RC-014/Bukhari 2079.
- N-083 est relié mais non dupliqué par RC-062/Bukhari 52.
- Couverture hadith : 135/140; 5 positions restent non matérialisées. Couverture religieuse : 178/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 historique et index.html inchangés.


## V132 — lot candidat 23
- Trois candidats externes vérifiés : N-084 à N-086.
- Références : Sahih al-Bukhari 7280, Sahih al-Bukhari 2363 et Sahih Muslim 1349a.
- Contrôle exact effectué contre les 69 structures héritées et les 66 structures du supplément V131.
- Statut : non canonique, audit final requis avant toute promotion; impact +0.
- Couverture inchangée à 135/140 hadiths et 178/183 structures; 5 positions restantes.
- Aucun H-ID attribué, aucune traduction française publiée inventée, productionReady=false, R-077 historique quarantiné, index.html inchangé.


## V133 — audit complet et promotion du lot 23
- N-084, N-085 et N-086 promus après comparaison avec le canon hérité et le supplément.
- N-084 est relié mais non dupliqué par N-062/Muslim 2956 et N-080/Bukhari 3244.
- N-085 est relié mais non dupliqué par N-023/Bukhari 6012 et N-081/Muslim 1955a.
- Couverture hadith : 138/140; 2 positions restent non matérialisées. Couverture religieuse : 181/183.
- Aucun ancien H-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 historique et index.html inchangés.


## V134 — lot candidat 24
- Deux candidats externes vérifiés : N-087 et N-088.
- Références : Sahih al-Bukhari 5534 et Sahih Muslim 2565a.
- Contrôle exact effectué contre les 69 structures héritées et les 69 structures du supplément V133.
- N-087 est relié mais non dupliqué par RC-019/Abu Dawud 4811; aucun équivalent thématique direct repéré pour N-088.
- Statut : non canonique, audit final requis avant toute promotion; impact +0.
- Couverture inchangée à 138/140 hadiths et 181/183 structures; 2 positions restantes.
- Aucun H-ID ni R-ID attribué, aucune traduction française publiée inventée, productionReady=false, R-077 historique quarantiné, index.html inchangé.


## V135 — clôture structurelle et promotion du lot 24
- N-087 et N-088 promus après comparaison avec le canon hérité et le supplément.
- N-087 est relié mais non dupliqué par RC-019/Abu Dawud 4811; aucun équivalent canonique direct repéré pour N-088.
- Couverture hadith : 140/140; aucune position administrative non matérialisée. Couverture religieuse : 183/183.
- Cette clôture est structurelle : elle ne transforme pas les nouvelles notices en traductions françaises publiées.
- Aucun ancien H-ID ni R-ID revendiqué; traduction française publiée PENDING; productionReady=false; R-077 historique et index.html inchangés.


## V136 — sérialisation canonique unifiée
- Nouvelle vue administrative unique de 183 objets : 43 Qur’an, 69 hadiths hérités et 71 hadiths du supplément.
- Chaque charge utile est copiée sans réécriture depuis son registre autoritatif et conserve un pointeur de provenance.
- Couverture structurelle inchangée : 140/140 hadiths et 183/183 structures religieuses; aucune position restante.
- Cette vue n’invente ni traduction française, ni H-ID, ni R-ID; elle ne rend pas le corpus éditorialement prêt à la production.
- R-077 historique reste quarantiné et index.html reste inchangé.


## V137 — audit de préparation éditoriale des 140 hadiths
- Couverture structurelle confirmée : 140/140 hadiths et 183/183 structures religieuses.
- Préparation française dans les registres canoniques : 0/140 notice avec texte français publié et provenance exploitable.
- Les 69 structures héritées ne contiennent pas de champ canonique de texte français publié; d’anciens fichiers peuvent contenir des pistes qui doivent être auditées avant réemploi.
- Les 71 structures du supplément déclarent explicitement publishedFrenchTranslation=null et une provenance française PENDING.
- Aucun thème, résumé anglais ou traduction automatique n’est assimilé à une traduction française publiée.
- Intégration runtime non autorisée; R-077 historique quarantiné et index.html inchangé.

## V138 — récupération française, audit local du lot 1
- RC-001 à RC-005 audités dans le registre historique de reconstruction V11.
- 5/5 possèdent un `auditSummaryFr`, mais les 5 champs `publishedFrenchTranslation` correspondants sont explicitement nuls.
- Ces formulations restent des résumés éditoriaux : 0/5 n’est promue comme traduction française publiée.
- Prochaine action : retrouver pour chaque référence une édition française publiée et traçable, puis vérifier le texte avant consolidation.
- Corpus canonique, R-077 et `index.html` inchangés; intégration runtime non autorisée.

## V139 — audit externe français du lot 1
- Sources françaises exactes localisées chez HadeethEnc pour RC-002, RC-003 et RC-005.
- RC-003 et RC-005 portent un avertissement explicite de révision; aucune promotion.
- Le numéro de version requis par les conditions de republication n’est pas affiché sur les trois pages; aucune promotion.
- RC-001 et RC-004 restent sans source française exacte retenue dans ce lot.
- Bilan : 3 pistes exactes, 0 traduction canonisée; corpus religieux, R-077 et `index.html` inchangés.

## V140 — première traduction française publiée canonisée
- Version française HadeethEnc vérifiée : `v1.17.0`.
- RC-002 / Sahih al-Bukhari 6114 promu avec texte français publié, éditeur, URL, identifiant source, version et métadonnées de transmission.
- Couverture éditoriale française : 1/140 prête; 139/140 en attente.
- RC-003 et RC-005 restent bloquées par leur avertissement de révision; RC-001 et RC-004 restent en recherche.
- Aucun texte synthétisé ou modifié; corpus structurel, R-077 et `index.html` inchangés; intégration runtime non autorisée.

## V141 — résolution des sources françaises RC-001 et RC-004
- L’identifiant officiel HadeethEnc de RC-001 / Sahih al-Bukhari 10 est 10101; la route française correspondante renvoie 404.
- L’identifiant officiel HadeethEnc de RC-004 / Sahih al-Bukhari 1413 est 6615; la route française correspondante renvoie 404.
- Ces deux recherches sont désormais closes comme absences de page française officielle à la date d’audit, et non comme traductions récupérables.
- Couverture éditoriale française inchangée : 1/140 prête; 139/140 en attente.
- Aucun texte synthétisé ou modifié; corpus structurel, R-077 et `index.html` inchangés; intégration runtime non autorisée.


## V142 — audit français RC-006 et RC-007
- RC-006 / Sahih al-Bukhari 13 : page française officielle HadeethEnc 4717 localisée; la référence affichée correspond exactement, mais la page porte l’avertissement explicite « Cette traduction a besoin d’être davantage révisée et vérifiée. »; aucune promotion.
- RC-007 / Sahih al-Bukhari 6018 + Muslim 47a : page française officielle HadeethEnc 5437 localisée sur la famille convenue, avec référence affichée Sahîh Muslim 47; la page porte le même avertissement explicite de révision et ne matérialise pas la référence primaire Bukhari 6018; aucune promotion.
- Couverture éditoriale française inchangée : 1/140 prête; 139/140 en attente.
- Aucun texte synthétisé ou modifié; corpus structurel, R-077 et `index.html` inchangés; intégration runtime non autorisée.


## V143 — audit français RC-008 et RC-009
- RC-008 / Sahih al-Bukhari 5027 : page française officielle HadeethEnc 5913 localisée; référence exacte, aucune mention explicite de révision observée; traduction publiée promue verbatim avec provenance et version.
- RC-009 / Sahih al-Bukhari 6406 + Muslim 2694 : page française officielle HadeethEnc 5507 localisée; référence primaire exacte et aucune mention explicite de révision observée; texte laissé en attente de capture verbatim complète dans ce build.
- Couverture éditoriale française : 2/140 prêtes; 138/140 en attente.
- Aucun changement runtime; `index.html` inchangé; intégration runtime non autorisée.

## V145 — audit français RC-010 / RC-011
- RC-010 : page française HadeethEnc 3008 localisée; attribution Muslim et matn concordants, mais référence exacte 2723a non affichée dans la page auditée. Statut : PENDING.
- RC-011 : page française HadeethEnc 4928 localisée; attribution Al-Bukhârî/Muslim et matn concordants, mais référence exacte Bukhari 6133 non affichée dans la page auditée. Statut : PENDING.
- Aucune traduction promue; couverture publiée française : 3/140.
- Aucun changement runtime.


## V146 — audit français RC-012 / RC-013

- RC-012 : page française HadeethEnc 4318 localisée; elle affiche Sahîh Muslim 2759 sans suffixe de variante, donc aucune promotion de la référence canonique 2759a.
- RC-013 : aucune page française officielle HadeethEnc correspondant exactement à Sahih Muslim 1017e n’a été établie pendant cet audit.
- Aucune traduction promue; couverture publiée française maintenue à 3/140. `index.html` inchangé; intégration runtime non autorisée.

## V147 — audit français RC-014 / RC-015

- RC-014 / Sahih al-Bukhari 2079 : référence primaire confirmée dans la source canonique de contrôle; aucune page française officielle HadeethEnc exacte n'a été établie pendant cet audit.
- RC-015 / Sahih Muslim 2865d : référence primaire et suffixe `d` confirmés dans la source canonique de contrôle; aucune page française officielle HadeethEnc exacte n'a été établie pendant cet audit.
- Aucune traduction n'est synthétisée ni promue; couverture publiée française maintenue à 3/140. `index.html` inchangé; intégration runtime non autorisée.


## V148 — réaudit français multi-source

- RC-015 promu par correspondance forte: matn arabe exact + rapporteur + Muslim + famille 2865, avec traduction française HadeethEnc conservée verbatim.
- RC-014 reste pending-source: référence et matn confirmés, mais pas encore de traduction française publiée suffisamment traçable établie.
- Couverture française canonique: 5/140; pending: 135/140.
- Aucune traduction synthétisée; runtime inchangé.

## V149 — restauration de la terminologie « en attente »

- La couverture française canonique reste à 5/140 traductions publiées vérifiées.
- Les 136 autres entrées conservent le statut éditorial historique « en attente »; aucune migration globale vers `pending` n'est effectuée.
- Les libellés `PENDING_*` déjà présents dans des registres historiques restent inchangés afin de préserver la traçabilité des audits passés; ils ne redéfinissent pas l'état courant des 136 entrées.
- Un changement de statut individuel exige désormais une nouvelle preuve documentée (source française publiée, correspondance vérifiée ou obstacle précisément établi).
- Aucun texte religieux, `index.html` ou runtime n'est modifié; intégration runtime non autorisée.


## V151 — réaudit multi-source RC-014 et contrôle des droits

- RC-014 / Sahih al-Bukhari 2079 : une version française traçable a été localisée dans l’ouvrage de Mohammed Yacine KASSAB publié par IslamHouse; identité confirmée par rapporteur et contenu.
- La source affiche « Tous droits de reproduction, de traduction ou d’adaptation réservés » : aucune copie dans le registre canonique de traduction publiée n’est effectuée sans autorisation de réutilisation établie.
- RC-014 reste donc en attente pour la production; couverture française réutilisable maintenue à 5/140, soit 135/140 en attente.
- Aucun texte religieux ni runtime n’est modifié.


## V152 — premier audit français groupé RC-016 → RC-035
- 20 structures auditées en un lot.
- RC-023, RC-024 et RC-034 promus avec traduction française HadeethEnc verbatim et identité vérifiée.
- Les 17 autres structures du lot restent en attente; aucun statut n’est changé sans preuve suffisante.
- Couverture française canonique : 8/140 vérifiées; 132/140 en attente.
- Aucun changement runtime; `index.html` inchangé; intégration production non autorisée.


## V154 — deuxième audit français groupé RC-036 → RC-055
- 20 structures auditées en un lot.
- RC-036, RC-039, RC-040, RC-044, RC-045 et RC-054 promus avec traduction française HadeethEnc verbatim et identité vérifiée.
- RC-043 et RC-046 restent en attente car la page française HadeethEnc affiche explicitement un avertissement de révision/vérification.
- Les 12 autres structures non promues restent en attente faute de preuve française suffisante dans cette passe.
- Couverture française canonique : 23/140 vérifiées; 117/140 en attente.
- Aucun changement runtime; `index.html` inchangé; intégration production non autorisée.


## V155 — premier audit français groupé du supplément N-001 → N-023

- 20 structures du supplément ont été auditées en lot.
- N-018 / Sahih Muslim 2588 est promu avec la traduction française publiée HadeethEnc, conservée verbatim et sourcée.
- Les 19 autres structures du lot restent en attente; aucun statut n’est modifié sans preuve française qualifiée.
- Couverture française canonique : 24/140 vérifiées; 116/140 en attente.
- Aucun changement runtime; aucune traduction synthétisée.


## V156 — deuxième audit français groupé du supplément N-025 → N-054

- 20 structures auditées en lot : N-025, N-026, N-027, N-029, N-030, N-033, N-034, N-035, N-036, N-037, N-038, N-039, N-040, N-048, N-049, N-050, N-051, N-052, N-053 et N-054.
- 8 nouvelles traductions françaises publiées et traçables promues : N-025, N-033, N-036, N-038, N-039, N-048, N-049 et N-052.
- Les 12 autres structures restent en attente ; aucune traduction n'a été synthétisée ou reformulée.
- Couverture française canonique : 32/140 vérifiées; 108/140 en attente.
- `index.html` inchangé ; aucune intégration runtime autorisée.


## V157 — troisième audit français groupé du supplément N-055 → N-071

- 17 structures auditées en lot.
- 4 nouvelles traductions françaises publiées et traçables promues : N-057, N-061, N-067 et N-068.
- N-060 reste en attente car HadeethEnc affiche explicitement un avertissement de révision/vérification.
- Les 12 autres structures restent en attente faute de preuve française suffisante dans cette passe.
- Couverture française canonique : 36/140 vérifiées; 104/140 en attente.
- `index.html` inchangé ; aucune traduction synthétisée ; aucune intégration runtime autorisée.


## V158 — correction de cohérence canonique après V157
- Les quatre validations documentées en V157 (N-057, N-061, N-067, N-068) sont désormais effectivement matérialisées dans le registre canonique français.
- Couverture canonique réelle : 36/140 vérifiées; 104/140 en attente.
- Cette version corrige une dette de cohérence de données; aucune nouvelle traduction n’est synthétisée et `index.html` reste inchangé.


## V159 — second passage français ciblé
- N-037 / Sahih Muslim 2999 et N-040 / Sahih al-Bukhari 2449 promus depuis les pages françaises HadeethEnc après concordance référence + matn + rapporteur.
- Aucun avertissement explicite de révision observé sur ces deux pages.
- Couverture française canonique : 38/140 vérifiées ; 102/140 en attente.
- Aucun texte traduit/synthétisé par le projet ; runtime inchangé.


## V160 — second passage français ciblé

Deux nouvelles traductions françaises publiées HadeethEnc sont intégrées au registre canonique : RC-011 (Bukhari 6133, HadeethEnc 4928) et RC-025 (Bukhari 6307, HadeethEnc 4808). RC-006 et RC-007 restent en attente en raison d'un avertissement explicite de révision sur leur page française. Couverture : 40/140 vérifiées, 100/140 en attente. Aucun changement du runtime.


## V161 — second passage français ciblé

RC-003 / Sahih Muslim 2564c est promu depuis HadeethEnc 4555 après concordance du matn arabe, du rapporteur Abû Hurayrah, de la collection Muslim et de la référence 2564 affichée. Aucun avertissement explicite de révision n’est observé. RC-005 et RC-038 restent en attente en raison d’un avertissement explicite de révision; RC-022 n’est pas promu car la fiche française trouvée utilise un autre rapporteur. Couverture : 41/140 vérifiées, 99/140 en attente. Aucun changement du runtime.


## V162 — second passage français ciblé

N-004 / Sahih Muslim 2162a est promu depuis HadeethEnc 5343 après concordance du matn arabe, du rapporteur Abû Hurayrah, de la collection Muslim et de la référence 2162 affichée. Aucun avertissement explicite de révision n’est observé. N-005 / Muslim 2586a reste en attente car sa page française affiche explicitement un avertissement de révision/vérification. Couverture : 42/140 vérifiées, 98/140 en attente. Aucun changement du runtime.

## V163 — second passage français ciblé

Quatre nouvelles structures sont promues depuis HadeethEnc sans avertissement explicite de révision : N-002 / Bukhari 24 (parallèle Muslim 36 affiché, même matn et Ibn Oumar), N-003 / Bukhari 1904, N-008 / Muslim 2664 et N-019 / Bukhari 6028 (même matn, Abû Mûsâ et attribution conjointe Bukhari/Muslim). Couverture : 46/140 vérifiées, 94/140 en attente. Aucun texte français n'a été synthétisé ni reformulé et aucun changement du runtime.


## V164 — second passage français

- 3 promotions HadeethEnc supplémentaires : N-001, N-021, N-022.
- Couverture française canonique : 49/140 vérifiées ; 91/140 en attente.
- Aucun texte synthétisé ; runtime inchangé.


## V165 — second passage français

- 3 promotions HadeethEnc supplémentaires : N-007, N-085, N-088.
- Couverture française canonique : 52/140 vérifiées ; 88/140 en attente.
- Les promotions reposent sur le même matn arabe, le même rapporteur et l’attribution canonique/parallèle documentée ; aucun avertissement explicite de révision observé.
- Aucun texte synthétisé ; runtime inchangé.


## V166 — second passage français
- 3 promotions documentées : N-059 (Muslim 54a), N-062 (Muslim 2956), N-077 (Bukhari 2457).
- Couverture française canonique : 55/140 vérifiées ; 85/140 en attente.
- Textes français repris verbatim depuis HadeethEnc ; aucune traduction synthétisée.
- Runtime `index.html` inchangé.


## V167 — second passage français
- 3 promotions HadeethEnc supplémentaires : N-069 (Muslim 2721a), N-082 (Bukhari 2072), N-084 (Bukhari 7280).
- Couverture française canonique : 58/140 vérifiées ; 82/140 en attente.
- Concordance fondée sur le matn, le rapporteur et la collection/référence ; aucun avertissement explicite de révision observé.
- Aucun texte synthétisé ; runtime `index.html` inchangé.


## V168 — second passage français
- N-063 / Sahih Muslim 2735a promu depuis HadeethEnc 3232 après concordance matn + rapporteur + référence Muslim.
- Couverture française publiée: 59/140 vérifiées; 81/140 en attente.
- Aucun texte français synthétique. Runtime inchangé.


## V169 — second passage français
- RC-016 / Sahih Muslim 2749 promu depuis HadeethEnc 5454 : référence exacte, matn et rapporteur concordants.
- RC-031 / Sahih al-Bukhari 5997 promu depuis HadeethEnc 5440 après concordance matn + Abû Hurayrah + attribution Bukhari/Muslim et contrôle externe de la référence exacte Bukhari 5997.
- Couverture française publiée : 61/140 vérifiées ; 79/140 en attente.
- Aucun texte français synthétique. Runtime inchangé.


## V170 — second passage français
- RC-032 / Sahih al-Bukhari 6013 promu via HadeethEnc français 5439, concordance matn + Jarir ibn Abdullah + attribution Bukhari/Muslim.
- RC-037 reste en attente : avertissement explicite de révision sur la page française.
- Couverture : 62/140 vérifiées, 78/140 en attente.
- Aucun texte français synthétisé; runtime inchangé.


## V171 — second passage français
- N-076 / Sahih al-Bukhari 5351 promu via HadeethEnc français 6460 après concordance du matn, d’Abû Mas‘ûd et de l’attribution Bukhari/Muslim (numérotation parallèle affichée : Bukhari 55).
- N-081 / Sahih Muslim 1955a promu via HadeethEnc français 4319 : référence Muslim 1955, Chaddâd ibn Aws et matn concordants.
- Couverture : 64/140 vérifiées, 76/140 en attente.
- Aucun texte français synthétisé ; runtime `index.html` inchangé.


## V172 — second passage français
- N-079 / Sahih Muslim 2569 promu via HadeethEnc français 5544 : référence Muslim 2569, Abû Hurayrah et matn concordants.
- Aucun avertissement explicite de révision observé sur la fiche française.
- Couverture : 65/140 vérifiées, 75/140 en attente.
- Aucun texte français synthétisé ; runtime `index.html` inchangé.


## V173 — second passage français
- N-065 / Sahih al-Bukhari 3470 promu via HadeethEnc français 4310 : Abû Sa‘îd al-Khudrî, matn du repentir de l’homme ayant tué cent personnes, attribution Bukhari/Muslim concordante.
- N-071 / Sahih Muslim 2327a promu via HadeethEnc français 6389 : ‘Â’ishah, matn du choix du plus facile et de l’absence de vengeance personnelle, parallèle Muslim 2327 confirmé.
- Couverture : 66/140 vérifiées, 74/140 en attente.
- Aucun texte français synthétisé ; runtime `index.html` inchangé.


## V174 — second passage français

- RC-012 / Sahih Muslim 2759a promu depuis HadeethEnc FR 4318 après concordance matn + rapporteur + collection + famille 2759.
- Couverture française canonique : 68/140 vérifiées, 72/140 en attente.
- Aucun texte français synthétisé; runtime index.html inchangé.


## V175 — second passage groupé français
- Lot audité : 20 structures encore en attente.
- Promotions françaises publiées : N-035 et N-087.
- Couverture : 70/140 vérifiées, 70/140 en attente.
- Aucun texte français synthétisé; runtime/index.html inchangé.

## V176 — troisième passage groupé français

- Lot audité : 20 structures encore en attente.
- RC-021 / Sahih al-Bukhari 6477 promu via HadeethEnc français 3479 : Abû Hurayrah, matn sur la parole prononcée sans en mesurer la gravité, concordance avec la famille Bukhari/Muslim, aucune alerte explicite de révision observée.
- RC-004 reste en attente : la publication historique retrouvée confirme l’identité arabe et fournit un titre/une explication en français, mais la preuve récupérée ne constitue pas une traduction française directe et complète du matn canonique ; aucune reconstruction n’est admise.
- Couverture : 71/140 vérifiées, 69/140 en attente. Corpus global : 183 structures.
- `index.html` inchangé ; aucune intégration runtime autorisée.

## V178 — quatrième passage groupé français
- RC-027 et RC-042 ajoutées au registre français canonique après vérification de la concordance religieuse et de la publication française.
- État français : 74/140 validées, 66/140 en attente; corpus global inchangé à 183 structures.
- `index.html` inchangé; intégration production non autorisée.


## V179 — sixième passage groupé français
- Lot de 20 structures réauditées; RC-035 / Sahih Muslim 2593 promue depuis la publication française de l’Encyclopédie des paroles prophétiques traduites (hadith 5797), avec ʽÂ’ishah, matn complet et classement authentique.
- Couverture : 75/140 validées, 65/140 en attente. Corpus global : 183 structures.
- Aucun changement du runtime `index.html`; aucune traduction religieuse synthétisée.


## V180 — septième passage groupé français
- Lot de 20 structures réauditées; RC-053 / Sahih al-Bukhari 6022 promue depuis la publication française historique HadeethEnc (hadith unifié 6370), avec Abû Mûsâ Al Ach’arî, matn complet et degré Authentique.
- Concordance Bukhari 6022 vérifiée par rapporteur + matn arabe complet; aucune traduction synthétisée.
- Couverture : 76/140 validées, 64/140 en attente. Corpus global : 183 structures.
- Aucun changement du runtime `index.html`; aucune intégration runtime autorisée.


## V181 — huitième passage groupé français

- RC-041 / Sahih al-Bukhari 6009 est promu depuis HadeethEnc 10100 : Abû Hurayrah, même matn sur l’homme qui abreuve un chien assoiffé, degré authentique et attribution Al-Bukhârî/Muslim, sans avertissement explicite de révision observé.
- Les 19 autres structures du lot restent en attente. Aucun texte français n’a été synthétisé ou complété.
- Couverture : 77/140 validées, 63/140 en attente. Corpus global : 183 structures.
- Runtime : inchangé; aucune intégration de production autorisée.


## V182 — neuvième passage groupé français

- Ré-audit groupé de 20 structures encore en attente.
- Promotion de RC-010 / Sahih Muslim 2723a depuis HadeethEnc FR 3008 : Abdullâh ibn Mas’ûd, invocation complète du soir et du matin, traduction publiée verbatim, authentique, sans avertissement explicite de révision observé.
- Les 19 autres structures du lot restent en attente; aucune traduction synthétisée ou complétée.
- Couverture : 78/140 validées, 62/140 en attente. Corpus global : 183 structures.
- `index.html` inchangé; aucune intégration runtime autorisée.


## V183 — dixième passage groupé français

- Ré-audit groupé de 20 structures encore en attente.
- Promotion de RC-055 / Sahih al-Bukhari 2444 depuis HadeethEnc FR 4236 : Anas ibn Mâlik, matn complet sur le secours de l’opprimé et l’arrêt de l’oppresseur, traduction publiée verbatim, authentique, sans avertissement explicite de révision observé.
- Concordance canonique établie par rapporteur + matn + collection, conformément à la politique du projet.
- Les 19 autres structures du lot restent en attente; aucune traduction synthétisée ou complétée.
- Couverture : 79/140 validées, 61/140 en attente. Corpus global : 183 structures.
- `index.html` inchangé; aucune intégration runtime autorisée.


## V184 — onzième passage groupé français

- Ré-audit groupé de 20 structures encore en attente.
- Promotion de N-013 / Sahih al-Bukhari 30 depuis HadeethEnc FR 6407 : Al-Ma’rûr ibn Suwayd, récit complet d’Abû Dharr sur les comportements de la Jâhiliyah et le traitement des personnes placées sous autorité, traduction publiée verbatim, authentique, attribution conjointe Al-Bukhârî/Muslim, sans avertissement explicite de révision observé.
- Concordance canonique établie par rapporteur + matn + collection, conformément à la politique du projet.
- Les 19 autres structures du lot restent en attente; aucune traduction synthétisée ou complétée.
- Couverture : 80/140 validées, 60/140 en attente. Corpus global : 183 structures.
- `index.html` inchangé; aucune intégration runtime autorisée.


## V185 — douzième passage français ciblé

- RC-057 / Sahih al-Bukhari 6416 réaudité : la page française HadeethEnc 4704 concorde avec la référence mais affiche explicitement un besoin de révision et de vérification; maintien en attente. Une publication française alternative concordante a été repérée sur Sunnaty, sans promotion car la politique canonique actuelle du registre impose HadeethEnc et ses métadonnées de version.
- RC-065 / Sahih Muslim 2564a réaudité : HadeethEnc FR 4706 concorde avec Muslim 2564 mais affiche également l’avertissement explicite de révision; maintien en attente.
- Aucune promotion : couverture inchangée à 80/140 validées et 60/140 en attente. Corpus global : 183 structures.
- Aucun texte français synthétisé; `index.html` inchangé; aucune intégration runtime autorisée.


## V186 — protocole français multisource vérifié

- La politique de provenance française est élargie sans modifier les 80 traductions déjà validées : HadeethEnc reste la source primaire; IslamHouse devient une source indépendante conditionnelle au niveau du document/hadith; Sunnaty devient une source de recoupement structurée, non suffisante à elle seule pour neutraliser un avertissement explicite de révision.
- Toute promotion exige toujours une traduction française publiée verbatim, l'identité canonique du hadith, une provenance par item et l'absence de divergence substantielle non résolue. La réputation générale d'un site ne suffit jamais.
- Aucune traduction n'est synthétisée, fusionnée ou reformulée. Couverture inchangée : 80/140 validées, 60/140 en attente.
- `index.html` inchangé; aucune intégration runtime autorisée.

## V187 — poursuite du ré-audit français multisource
- RC-048 promu: traduction française publiée HadeethEnc 4322m, identité établie par Ibn Abbas + matn qudsi + attribution Bukhari/Muslim + parallèle Bukhari 6491.
- RC-006 maintenu: avertissement explicite de révision sur la page française HadeethEnc.
- Couverture française: 81/140 validées; 59/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé.


## V188 — poursuite du ré-audit français multisource
- RC-001, RC-005, RC-007 et RC-014 réaudités : identité canonique confirmée, mais aucune traduction française publiée admissible et traçable n’a été établie dans cette passe.
- Aucune promotion : couverture française inchangée à 81/140 validées et 59/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.


## V189 — poursuite du ré-audit français multisource
- 8 structures supplémentaires réauditées (RC-017, RC-022, RC-028, RC-037, RC-049, RC-050, N-030, N-053).
- Aucune nouvelle traduction française publiée n’a été établie avec une provenance suffisamment traçable dans cette passe; aucune promotion.
- Couverture française inchangée : 81/140 validées, 59/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.


## V190 — poursuite du ré-audit français multisource
- RC-026, RC-029, RC-043 et RC-061 réaudités.
- RC-043 / Sahih al-Bukhari 6116 : fiche française HadeethEnc 4709 concordante et authentique, mais avertissement explicite de révision/vérification; maintien en attente.
- RC-026, RC-029 et RC-061 : aucune publication française admissible suffisamment traçable établie dans cette passe; maintien en attente.
- Aucune promotion : couverture française inchangée à 81/140 validées et 59/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.

## V191 — poursuite du ré-audit français multisource
- Registre V190 réextrait avant recherche : les correspondances ont été contrôlées contre les identifiants et références canoniques réellement encore en attente.
- N-051 / Sahih al-Bukhari 6306 : HadeethEnc FR 5503 affiche bien Bukhari 6306 et le degré authentique, mais la traduction française visible omet la conséquence finale du matn arabe concernant celui qui récite l'invocation avec certitude puis meurt avant le soir/le matin; une remarque publique signale également cette omission. Maintien en attente.
- N-050 / Sahih al-Bukhari 7405 : HadeethEnc FR 6461 affiche Bukhari 7405, mais la traduction française visible ne couvre que la partie sur le rapprochement alors que la structure canonique N-050 porte sur le début du hadith (« Je suis selon l'opinion que Mon serviteur a de Moi… »). Maintien en attente.
- Les recherches ciblées de cette passe n'ont pas établi de nouvelle traduction française publiée admissible pour les autres références testées.
- Aucune promotion : couverture française inchangée à 81/140 validées et 59/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.

## V192 — poursuite du ré-audit français multisource
- N-054 / Sahih Muslim 2722 : publication française HadeethEnc historique retrouvée, mais équivalence intégrale du matn canonique actuel non établie; maintien en attente.
- N-055 / Sahih Muslim 2725a : fiche française HadeethEnc 5915 retrouvée, mais le texte français affiché ne couvre pas explicitement l’illustration route/flèche portée par le matn canonique; maintien en attente.
- Aucune promotion : 81/140 validées, 59/140 en attente.
- Aucune traduction synthétisée; runtime inchangé.

## V193 — poursuite du ré-audit français multisource
- RC-018 / Bukhari 1427, RC-030 / Bukhari 6466, RC-052 / Bukhari 2631 et RC-069 / Bukhari 7377 réaudités.
- Les références/matn canoniques ont pu être recoupés, mais aucune traduction française publiée répondant complètement au protocole V186 n'a été établie pour ces quatre cas dans cette passe.
- Aucune promotion : 81/140 validées, 59/140 en attente.
- Aucune traduction synthétisée; runtime `index.html` inchangé.


## V194 — poursuite du ré-audit français multisource
- RC-052 / Sahih al-Bukhari 2631 promu depuis HadeethEnc FR 3558 : texte français publié, degré Authentique, attribution Al-Bukhârî, identité établie par narrateur + matn distinctif + collection.
- RC-069 / Sahih al-Bukhari 7377 promu depuis HadeethEnc FR 3290 : récit complet d’Usâmah ibn Zayd, degré Authentique, attribution Al-Bukhârî/Muslim, concordance avec les routes canoniques Bukhari 7377/1284 et Muslim 923a.
- Couverture française : 83/140 validées, 57/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.


## V195 — poursuite du ré-audit français multisource
- N-053 / Sahih Muslim 2696 promu depuis HadeethEnc FR 6112 : traduction française directe, degré Authentique, référence Muslim 2696, identité établie par narrateur + matn + collection.
- N-030 / Muslim 2702 et N-024 / Bukhari 6016 maintenus en attente : aucune fiche française directe admissible établie dans cette passe.
- Couverture française : 84/140 validées, 56/140 en attente.
- Aucune traduction synthétisée; `index.html` inchangé.

## V196 — poursuite multisource française (2026-09-17)
- Réaudit ciblé de `N-030 / Sahih Muslim 2702` et `N-024 / Sahih al-Bukhari 6016`.
- Les fiches HadeethEnc correspondantes sont vérifiables en anglais et confirment le matn arabe, le degré authentique et les références canoniques, mais leurs routes françaises directes testées retournent 404 dans cette passe.
- Décision : maintien des deux structures en attente ; aucune traduction via une langue intermédiaire, aucune synthèse et aucune fusion.
- Couverture inchangée : **84/140** traductions françaises canoniques publiées ; **56/140** en attente.
- Runtime : `index.html` inchangé ; aucune intégration runtime autorisée.


## V197 — promotion multisource indépendante (2026-09-17)
- RC-061 / Sahih al-Bukhari 16 promu depuis la publication française IslamHouse « 3 000 hadiths et citations coraniques », attribuée à Mohammed Yacine KASSAB; identité recoupée par narrateur + matn distinctif + référence canonique Bukhari 16.
- RC-057 / Bukhari 6416 et RC-065 / Muslim 2564a restent en attente en raison des avertissements explicites de révision HadeethEnc non résolus indépendamment. RC-004 / Bukhari 1413 reste en attente faute de provenance française admissible établie dans cette passe.
- Couverture française : **85/140** validées, **55/140** en attente.
- Aucune traduction synthétisée; `index.html` inchangé; aucune intégration runtime autorisée.
