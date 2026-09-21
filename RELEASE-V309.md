# V309 — Invite de mise à jour différée

L'invite de mise à jour n'écrase plus une fenêtre modale déjà ouverte. Si une mise à jour est prête pendant la saisie, elle est proposée après fermeture de la fenêtre. Les protections V307/V308 lors de `controllerchange` restent actives.

Test automatisé : invite différée et saisie modale conservée. La transition entre versions dans un navigateur réel reste à valider.
