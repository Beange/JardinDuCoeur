# V297 — Contrôle de cohérence du shell

Le contrôle `runtime-shell-v278` comparait le HTML actuel à une empreinte SHA-256 figée de V278 et échouait à chaque modification légitime. Il est remplacé par un contrôle de présence des fichiers du shell et de concordance des numéros de build dans HTML, JavaScript et service worker. Aucun changement des données utilisateur ni du corpus religieux.

La validation en navigateur et sur hébergement reste à effectuer.
