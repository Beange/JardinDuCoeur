# Release V215 — Robustesse

## Changements

- Version **1.5.3 / build 215** et cache PWA V215.
- Encapsulation des lectures, écritures et suppressions `localStorage` pour résister aux erreurs de quota, de sécurité ou de stockage indisponible.
- Conservation du repli vers la copie locale de récupération lorsque l’état principal est illisible.
- Import sécurisé : la copie de récupération doit pouvoir être écrite avant le remplacement des données courantes.
- Signalement utilisateur des erreurs runtime inattendues et des promesses rejetées non gérées, avec journalisation console pour diagnostic.
- Corpus religieux inchangé et maintenu en standby.

## Validation

Exécuter `python tools/validate_app_release.py` puis `python tools/validate_project.py`.
