# Release V242 — Audit PWA/offline & sauvegarde/restauration

Version applicative : **1.8.5 · build 242**.

## Objectif
Consolider le comportement local-first avant la recette finale, en particulier la récupération après import et la continuité hors ligne.

## Changements
- La copie de récupération créée avant un import n’est plus écrasée lors d’une simple sortie ou mise en arrière-plan.
- Une action « Restaurer la copie de récupération » apparaît dans Sauvegarde / Export lorsqu’une copie existe.
- La restauration valide et normalise les données avant de remplacer l’état courant.
- La session d’interface est réinitialisée après restauration pour éviter de rouvrir un écran ou un champ devenu incohérent.
- Le cache PWA passe à `jardin-du-coeur-v242` ; la stratégie hors ligne et le nettoyage des anciens caches restent inchangés.
- Le schéma de données et la clé de stockage restent inchangés.
- Le corpus religieux reste en standby et n’est pas modifié.
