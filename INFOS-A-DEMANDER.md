# Mama La Pizza : infos à lui demander

Le site est en ligne avec ce qu'on a trouvé publiquement (Instagram, Google, Uber Eats). Voici ce qu'il faut confirmer ou récupérer, par ordre d'importance.

## 1. La carte et les prix
- Les prix affichés viennent de sa page **Uber Eats** (relevés le 5 novembre 2026). Les prix plateforme sont souvent plus chers qu'au comptoir : il nous faut **ses prix boutique**.
- Les prix **par taille** : S, L, XL, XXL (le site propose déjà le choix de la taille dans le formulaire).
- La carte complète : sa story « Le menu » ou le flyer papier qu'on voit dans les reels (Starters, Version sucrée 9,50 €, etc.). Une photo nette du flyer suffit.
- Les pastilles **végétarienne / piquante** posées d'après les ingrédients : à vérifier.
- **Halal** ? Sa page Uber Eats l'indique (jambon de dinde, veau fumé) : si c'est vrai, on l'ajoute, c'est très recherché à Amiens.

## 2. Les conditions des offres
- **Mardi −20 %** : toutes les pizzas, sur place et en livraison. Et à emporter ?
- **Jeudi −20 %** : pizzas XL et XXL, sur place, à emporter, livraison.
- **Menu étudiant 7,90 €** : pizza S au choix ou Détroit + boisson, « valable uniquement le midi ». Quels jours ? Carte étudiante demandée ?
- **Pause déj' 10,90 €** : pizza L + boisson, lundi au vendredi 11 h – 14 h 30.
- **XXL achetée = XXL offerte** (vitrine, Facebook) : toujours valable ? Sur place et à emporter seulement ?
- Les offres se cumulent-elles ?

## 3. La livraison
- **Zone** couverte (Amiens seulement ? Rivery, Longueau, Salouël… ?).
- **Minimum** de commande pour la livraison offerte.
- Délai moyen.
- La livraison offerte, c'est seulement en commandant par téléphone ?

## 4. Les horaires
- Le site affiche les horaires **Google** : lun.–mer. 11 h 30 – 14 h 30 et 18 h – minuit ; jeu.–sam. jusqu'à 1 h ; dimanche 18 h – minuit.
- Son affiche Instagram « Nos horaires » dit : **vendredi et dimanche 17 h – 1 h**. Laquelle est juste ? (à corriger aussi sur Google si besoin)

## 5. La plateforme de commande
- Lien **Uber Eats** déjà branché. A-t-elle aussi **Deliveroo** (autocollant sur la porte) ? Si oui, le lien.
- Le bouton « Commander » de sa fiche Google renvoie vers quelle plateforme ?

## 6. Un portable pour WhatsApp
- Le 03 22 40 33 94 est un fixe. Avec un portable, on active la commande par WhatsApp (`data/site.json` → `whatsapp`).

## 7. L'e-mail
- L'adresse qui recevra les commandes à emporter et les demandes de groupe.
- Ensuite, sur Vercel : `RESEND_API_KEY`, `ORDER_NOTIFY_EMAIL`, `RESEND_FROM` (domaine vérifié). Tant que ce n'est pas fait, le formulaire fonctionne mais demande au client d'appeler pour confirmer.

## 8. Des photos
- **Une photo par pizza** (le site est prêt : `data/carte.json` → `photo`). Celles de sa page Uber Eats feraient l'affaire si elle les a en fichier.
- Une **pizza qui file** en gros plan (pour le hero, comme demandé dans le brief : aujourd'hui c'est la Reine vue de dessus).
- La salle vide, la façade sans personne devant, les desserts, la Détroit.
- Les fichiers vidéo de 3-4 reels si elle veut qu'ils se lisent directement sur le site.

## 9. Le logo
- Le logo a été redessiné en SVG depuis sa photo de profil Instagram (`public/logo.svg`). Si elle a le fichier d'origine (AI, PDF, SVG), on le remplace.

## 10. Mentions légales
- **SIRET**, raison sociale exacte, nom du directeur de la publication.

## 11. Le ton
- Le site **tutoie**, comme ses reels. À garder ou passer au vouvoiement ?
