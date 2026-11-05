# Mama La Pizza : contenu du site (à valider)

Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.

## À faire valider en priorité

- **Le tutoiement** : le site tutoie, comme ses reels. À garder ?
- **Les prix** : relevés sur sa page Uber Eats le 5 novembre 2026. Les prix des plateformes sont souvent plus élevés qu'au comptoir, et une seule taille y est affichée : il faut ses prix boutique en S, L, XL et XXL.
- **Les horaires** : ceux de Google sont affichés. Son affiche Instagram « Nos horaires » dit autre chose pour le vendredi et le dimanche (17 h – 1 h). Laquelle est la bonne ?
- **Les offres** (affiches Instagram) : mardi −20 % (toutes les pizzas, sur place et livraison), jeudi −20 % (XL et XXL), menu étudiant 7,90 € le midi, pause déj' 10,90 €, XXL achetée = XXL offerte. Conditions, cumul, justificatif étudiant, jours exacts du menu étudiant ?
- **La livraison offerte** : zone exacte, minimum de commande, délai moyen, et si c'est seulement par téléphone.
- **Halal** : sa page Uber Eats l'indique. Si c'est vrai, c'est un argument fort à ajouter sur le site.
- **Pastilles** « végétarienne » et « piquante » : posées d'après les ingrédients, à vérifier.
- **La note Google** affichée : 4,7/5 sur 274 avis, relevée le 2026-11-05.

## Référencement (balises title / description)

**FR** · Pizzeria à Amiens, livraison offerte et ouverte tard | Mama La Pizza

> Mama La Pizza, pizzeria au 15 rue des Otages à Amiens : pâte maison, produits frais, pizzas Détroit. Livraison offerte, à emporter ou sur place, ouvert jusqu'à 1 h du jeudi au samedi. 4,7/5 sur Google.

**EN** · Pizzeria in Amiens, free delivery and open late | Mama La Pizza

> Mama La Pizza, pizzeria at 15 rue des Otages in Amiens: homemade dough, fresh toppings, Detroit-style pizza. Free delivery, takeaway or dine-in, open until 1 am Thursday to Saturday. Rated 4.7/5 on Google.

## Horaires (data/horaires.json)

- Lundi : 11:30 – 14:30, 18:00 – 00:00
- Mardi : 11:30 – 14:30, 18:00 – 00:00
- Mercredi : 11:30 – 14:30, 18:00 – 00:00
- Jeudi : 11:30 – 14:30, 18:00 – 01:00
- Vendredi : 11:30 – 14:30, 18:00 – 01:00
- Samedi : 11:30 – 14:30, 18:00 – 01:00
- Dimanche : 18:00 – 00:00

## Les offres (data/offres.json)

| Offre | Montant | Texte FR | Texte EN | Où |
|---|---|---|---|---|
| Le mardi | −20 % | Sur toutes les pizzas. | On every pizza. | Sur place, En livraison |
| Le jeudi | −20 % | Sur les pizzas XL et XXL. | On XL and XXL pizzas. | Sur place, À emporter, En livraison |
| Menu étudiant | 7,90 € | Une pizza S au choix ou une Détroit, avec une boisson. | Any size S pizza or a Detroit, plus a drink. | Sur place, À emporter, le midi |
| Pause déj' | 10,90 € | Une pizza L et une boisson, du lundi au vendredi de 11 h 30 à 14 h 30. | A size L pizza and a drink, Monday to Friday, 11:30 am to 2:30 pm. | Sur place, À emporter, En livraison, le midi |
| XXL : 1 + 1 | 1 + 1 | Une pizza XXL achetée, la deuxième est offerte. | Buy one XXL pizza, get the second one free. | Sur place, À emporter |

## La carte et les prix (data/carte.json)

Relevés sur Uber Eats le 2026-11-05.

### Base tomate / Tomato base

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| Marguerite | 12,50 € | Sauce tomate, mozzarella, double fromage, origan. | Tomato sauce, mozzarella, double cheese, oregano. | Végétarienne |
| Pêcheurs | 13,50 € | Sauce tomate, thon, olives, mozzarella, double fromage. | Tomato sauce, tuna, olives, mozzarella, double cheese. |  |
| La Veggie | 13,50 € | Sauce tomate, champignons, oignon, tomates cerises, cœur d'artichaut, mozzarella, double fromage. | Tomato sauce, mushrooms, onion, cherry tomatoes, artichoke hearts, mozzarella, double cheese. | Végétarienne |
| La Reine | 13,50 € | Sauce tomate, jambon de dinde, champignons, mozzarella, double fromage. | Tomato sauce, turkey ham, mushrooms, mozzarella, double cheese. |  |
| La New-Yorkaise | 13,50 € | Sauce tomate, pepperoni, mozzarella, double fromage. | Tomato sauce, pepperoni, mozzarella, double cheese. |  |
| Junito di Mare | 13,50 € | Sauce tomate, fruits de mer au beurre persillé, mozzarella, double fromage. | Tomato sauce, seafood in parsley butter, mozzarella, double cheese. |  |
| Rabajoie | 13,50 € | Sauce tomate, viande hachée, œuf miroir, olives, mozzarella, double fromage. | Tomato sauce, minced beef, fried egg, olives, mozzarella, double cheese. |  |
| Fromaggi | 13,50 € | Sauce tomate, mozzarella, gorgonzola, chèvre, emmental, double fromage. | Tomato sauce, mozzarella, gorgonzola, goat's cheese, emmental, double cheese. | Végétarienne |
| Nanada | 14,50 € | Sauce tomate, viande hachée marinée maison, merguez, poulet, poivrons, œuf, mozzarella, double fromage. | Tomato sauce, house-marinated minced beef, merguez, chicken, peppers, egg, mozzarella, double cheese. | Piquante |

### Base crème / Cream base

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| La Chicago | 14,50 € | Crème fraîche, viande hachée, jambon de dinde, œuf, cheddar, mozzarella, double fromage. | Crème fraîche, minced beef, turkey ham, egg, cheddar, mozzarella, double cheese. |  |
| La Mielleuse | 14,50 € | Crème fraîche, chèvre, miel, mozzarella, double fromage. | Crème fraîche, goat's cheese, honey, mozzarella, double cheese. | Végétarienne |
| Mohtiflette | 14,50 € | Crème fraîche, dés de veau fumé, reblochon, pommes de terre, oignon, mozzarella, double fromage. | Crème fraîche, smoked veal, reblochon, potatoes, onion, mozzarella, double cheese. |  |
| La Raquette | 14,50 € | Crème fraîche, poulet fumé, émincé de poulet, pommes de terre, fromage à raclette, mozzarella, double fromage. | Crème fraîche, smoked chicken, sliced chicken, potatoes, raclette cheese, mozzarella, double cheese. |  |
| La Fameuse | 14,50 € | Crème fraîche, poulet fumé, pommes de terre, lardons, mozzarella, double fromage. | Crème fraîche, smoked chicken, potatoes, bacon bits, mozzarella, double cheese. |  |
| L'Indienne | 14,50 € | Crème fraîche, émincé de poulet, duo de poivrons, oignon, sauce curry, mozzarella, double fromage. | Crème fraîche, sliced chicken, red and green peppers, onion, curry sauce, mozzarella, double cheese. | Piquante |
| La Haaland | 14,50 € | Crème fraîche, saumon fumé, mozzarella, double fromage. | Crème fraîche, smoked salmon, mozzarella, double cheese. |  |
| Chicken Suprême | 14,50 € | Crème fraîche, poulet fumé, double poulet, oignon, duo de poivrons, double fromage. | Crème fraîche, smoked chicken, extra chicken, onion, red and green peppers, double cheese. |  |
| Warchi's | 14,50 € | Crème fraîche, fromage à raclette, bacon, merguez, champignons, mozzarella, double fromage. | Crème fraîche, raclette cheese, bacon, merguez, mushrooms, mozzarella, double cheese. |  |
| La Boisée | 14,50 € | Sauce gruyère maison, crème fraîche, poulet rôti, poivrons, tomates fraîches, mozzarella, double fromage. | House gruyère sauce, crème fraîche, roast chicken, peppers, fresh tomatoes, mozzarella, double cheese. |  |

### Spéciales & Détroit / Specials & Detroit

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| La BBQueen | 14,50 € | Sauce barbecue, viande hachée, pommes de terre, oignon rouge, cheddar, mozzarella. | Barbecue sauce, minced beef, potatoes, red onion, cheddar, mozzarella. |  |
| L'Andalouse | 14,50 € | Sauce andalouse, crème fraîche, viande hachée assaisonnée, poulet, emmental, mozzarella, double fromage. | Andalouse sauce, crème fraîche, seasoned minced beef, chicken, emmental, mozzarella, double cheese. |  |
| Tasty Chicky | 14,50 € | Base spéciale, morceaux de poulet, mozzarella fondue, oignons frits, herbes. | Special sauce, chicken pieces, melted mozzarella, crispy onions, herbs. |  |
| Détroit New-Yorkaise | 12,80 € | Pâte Détroit, sauce tomate, pepperoni, double fromage. | Detroit dough, tomato sauce, pepperoni, double cheese. |  |
| Détroit Chicago | 12,80 € | Pâte Détroit, crème fraîche, viande hachée, jambon de dinde, cheddar, œuf, double fromage. | Detroit dough, crème fraîche, minced beef, turkey ham, cheddar, egg, double cheese. |  |
| Détroit Nanada | 12,80 € | Pâte Détroit, sauce tomate, viande hachée marinée, merguez, poulet, poivrons, œuf, double fromage. | Detroit dough, tomato sauce, marinated minced beef, merguez, chicken, peppers, egg, double cheese. | Piquante |
| Détroit Margherite | 12,80 € | Pâte Détroit, sauce tomate, mozzarella, origan, double fromage. | Detroit dough, tomato sauce, mozzarella, oregano, double cheese. | Végétarienne |

### À côté / Sides

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| Potatoes | 5,50 € | Quartiers de pommes de terre assaisonnés. | Seasoned potato wedges. | Végétarienne |
| Mozza sticks | 7,00 € | 5 bâtonnets de mozzarella panés, fondants dedans. | 5 breaded mozzarella sticks, melting inside. | Végétarienne |
| Tenders | 7,00 € | 4 filets de poulet panés. | 4 breaded chicken fillets. |  |
| Nuggets | 9,00 € | 9 nuggets de poulet croustillants. | 9 crispy chicken nuggets. |  |
| Box mixte | 13,50 € | 6 nuggets, 6 bouchées camembert, 3 mozza sticks. | 6 nuggets, 6 camembert bites, 3 mozzarella sticks. |  |
| Box Fromaggi | 13,50 € | 6 chili cheese, 6 bouchées camembert, 3 mozza sticks. | 6 chili cheese bites, 6 camembert bites, 3 mozzarella sticks. |  |
| Box poulet | 16,00 € | 8 nuggets, 5 tenders, 3 wings. | 8 nuggets, 5 tenders, 3 wings. |  |

### Desserts / Desserts

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| Tiramisu framboise pistache | 4,00 € | Crème mascarpone à la pistache, biscuits, framboise. | Pistachio mascarpone cream, biscuits, raspberry. | Végétarienne |
| Tarte au Daim | 4,00 € | La part fondante et croquante. | Soft and crunchy, a cult classic. | Végétarienne |
| Choc Barr | 11,50 € | Pâte à pizza en demi-lune, chocolat fondu, morceaux de barre chocolatée, éclats croustillants. | Half-moon pizza dough, melted chocolate, chocolate bar pieces, crunchy bits. | Végétarienne |
| Détroit sucrée | 11,50 € | La Détroit version dessert : une base et un topping au choix. | The Detroit as a dessert: pick a base and a topping. | Végétarienne |

### Boissons / Drinks

| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |
|---|---|---|---|---|
| Coca-Cola | 2,50 € | 33 cl | 33 cl |  |
| Oasis Tropical | 2,50 € | 33 cl | 33 cl |  |
| Oasis pomme cassis | 2,50 € | 33 cl | 33 cl |  |
| Fanta orange | 2,50 € | 33 cl | 33 cl |  |

## Tous les textes du site

### intro

- **skip**
  - FR : Passer
  - EN : Skip

### announce

- **close**
  - FR : Fermer le bandeau
  - EN : Close the banner
- **default**
  - FR : Livraison offerte dans Amiens · Une pizza XXL achetée = une offerte, sur place ou à emporter
  - EN : Free delivery in Amiens · Buy one XXL pizza, get one free, dine-in or takeaway

### nav

- **skip**
  - FR : Aller au contenu
  - EN : Skip to content
- **menu**
  - FR : Menu
  - EN : Menu
- **close**
  - FR : Fermer le menu
  - EN : Close the menu
- **home**
  - FR : Mama La Pizza, accueil
  - EN : Mama La Pizza, home
- **carte**
  - FR : La carte
  - EN : Menu
- **offres**
  - FR : Offres
  - EN : Deals
- **livraison**
  - FR : Livraison
  - EN : Delivery
- **infos**
  - FR : Infos
  - EN : Info
- **orderCta**
  - FR : Commander
  - EN : Order
- **takeaway**
  - FR : À emporter
  - EN : Takeaway
- **call**
  - FR : Appeler
  - EN : Call
- **instagram**
  - FR : Instagram de Mama La Pizza
  - EN : Mama La Pizza on Instagram
- **lang**
  - FR : Langue
  - EN : Language

### hero

- **eyebrow**
  - FR : Pâte maison · Produits frais · Amiens
  - EN : Homemade dough · Fresh toppings · Amiens
- **title**
  - FR : La pizza qui régale Amiens
  - EN : The pizza Amiens can't get enough of
- **sub**
  - FR : Généreuse, bien garnie, servie avec le sourire. Et jusqu'à 1 h du matin le week-end.
  - EN : Generous, loaded, served with a smile. Until 1 am at the weekend.
- **ctaOrder**
  - FR : Commander
  - EN : Order
- **ctaMenu**
  - FR : Voir la carte
  - EN : See the menu
- **rating**
  - FR : {value}/5 sur Google
  - EN : {value}/5 on Google
- **ratingCount**
  - FR : {count} avis
  - EN : {count} reviews
- **ratingNote**
  - FR : Note Google relevée le {date}
  - EN : Google rating checked on {date}
- **delivery**
  - FR : Livraison offerte
  - EN : Free delivery
- **photoAlt**
  - FR : Pizza jambon, champignons et mozzarella de Mama La Pizza, vue de dessus
  - EN : Ham, mushroom and mozzarella pizza from Mama La Pizza, seen from above

### status

- **open**
  - FR : Ouvert
  - EN : Open
- **closed**
  - FR : Fermé
  - EN : Closed
- **until**
  - FR : jusqu'à {time}
  - EN : until {time}
- **untilTonight**
  - FR : jusqu'à {time} cette nuit
  - EN : until {time} tonight
- **opens**
  - FR : ouvre {day} à {time}
  - EN : opens {day} at {time}
- **today**
  - FR : aujourd'hui
  - EN : today
- **tomorrow**
  - FR : demain
  - EN : tomorrow

### tiles

- **title**
  - FR : La carte en un coup d'œil
  - EN : The menu at a glance
- **items.tomate**
  - FR : Base tomate
  - EN : Tomato base
- **items.creme**
  - FR : Base crème
  - EN : Cream base
- **items.speciales**
  - FR : Spéciales
  - EN : Specials
- **items.desserts**
  - FR : Desserts
  - EN : Desserts
- **items.boissons**
  - FR : Boissons
  - EN : Drinks
- **items.menus**
  - FR : Menus
  - EN : Meal deals

### services

- **title**
  - FR : Comment tu veux ta pizza ?
  - EN : How do you want your pizza?
- **items[1].id**
  - FR : delivery
  - EN : delivery
- **items[1].title**
  - FR : Livraison offerte
  - EN : Free delivery
- **items[1].text**
  - FR : Dans Amiens, on te livre sans frais.
  - EN : Anywhere in Amiens, no delivery fee.
- **items[2].id**
  - FR : takeaway
  - EN : takeaway
- **items[2].title**
  - FR : À emporter
  - EN : Takeaway
- **items[2].text**
  - FR : Commande, passe la prendre chaude.
  - EN : Order, then pick it up hot.
- **items[3].id**
  - FR : onsite
  - EN : onsite
- **items[3].title**
  - FR : Sur place
  - EN : Dine in
- **items[3].text**
  - FR : Salle rose, néon et four en vue.
  - EN : Pink room, neon bear, oven in sight.
- **items[4].id**
  - FR : phone
  - EN : phone
- **items[4].title**
  - FR : 03 22 40 33 94
  - EN : 03 22 40 33 94
- **items[4].text**
  - FR : Un coup de fil et c'est lancé.
  - EN : One call and it's in the oven.

### dough

- **eyebrow**
  - FR : La pâte maison
  - EN : Homemade dough
- **title**
  - FR : Pétrie ici, chaque jour
  - EN : Made here, every day
- **p1**
  - FR : Notre pâte est faite sur place, dans la cuisine que tu vois depuis la salle. Elle repose, puis passe au four quand tu commandes.
  - EN : Our dough is made on site, in the kitchen you can see from the dining room. It rests, then goes into the oven when you order.
- **p2**
  - FR : Les garnitures arrivent fraîches et on ne les compte pas. Double fromage partout, c'est la règle de la maison.
  - EN : Toppings arrive fresh and we don't count them. Double cheese on everything: house rule.
- **facts[1]**
  - FR : Pâte maison
  - EN : Homemade dough
- **facts[2]**
  - FR : Produits frais
  - EN : Fresh toppings
- **facts[3]**
  - FR : Double fromage
  - EN : Double cheese
- **facts[4]**
  - FR : Pizzas S à XXL
  - EN : Sizes S to XXL
- **photoAlt**
  - FR : Une pizzaiola de Mama La Pizza mélange la pâte dans un grand bol en cuisine
  - EN : A Mama La Pizza cook mixing dough in a large bowl in the kitchen

### reels

- **eyebrow**
  - FR : Vu sur Instagram
  - EN : Seen on Instagram
- **title**
  - FR : On cuisine. On filme aussi.
  - EN : We cook. We film, too.
- **intro**
  - FR : Les coulisses, les clients, les horaires. Avec un peu d'autodérision.
  - EN : Behind the scenes, the customers, the late hours. With a healthy dose of self-mockery.
- **play**
  - FR : Lire la vidéo : {title}
  - EN : Play the video: {title}
- **follow**
  - FR : Suivre {handle}
  - EN : Follow {handle}
- **loading**
  - FR : Chargement de la vidéo Instagram…
  - EN : Loading the Instagram video…
- **items.DcoTT_YMg2V.title**
  - FR : L'employé qui respecte ses horaires
  - EN : The employee who sticks to his hours
- **items.DcoTT_YMg2V.alt**
  - FR : Deux employés de Mama La Pizza rangent la cuisine à 21 h 59
  - EN : Two Mama La Pizza staff tidying the kitchen at 9:59 pm
- **items.DcvdU2ioJ8c.title**
  - FR : Sortir en boîte à 1 h du mat ? Non merci
  - EN : Clubbing at 1 am? No thanks
- **items.DcvdU2ioJ8c.alt**
  - FR : Un client mange sa pizza tard le soir chez Mama La Pizza
  - EN : A customer eating pizza late at night at Mama La Pizza
- **items.DdO8WLEMc9L.title**
  - FR : Quand le client est espagnol
  - EN : When the customer is Spanish
- **items.DdO8WLEMc9L.alt**
  - FR : Un pizzaiolo sort une pizza du four
  - EN : A pizza chef taking a pizza out of the oven
- **items.DbQzveFM-rT.title**
  - FR : La caisse, un samedi à 1 h du matin
  - EN : The till, Saturday, 1 am
- **items.DbQzveFM-rT.alt**
  - FR : Une serveuse devant la caisse ouverte, un samedi soir
  - EN : A server in front of the open till on a Saturday night

### order

- **eyebrow**
  - FR : Commander
  - EN : Order
- **title**
  - FR : Trois façons d'avoir ta pizza
  - EN : Three ways to get your pizza
- **intro**
  - FR : Le plus rapide reste le téléphone. On répond pendant les heures d'ouverture.
  - EN : The phone is still the fastest. We pick up during opening hours.
- **call.title**
  - FR : Par téléphone
  - EN : By phone
- **call.text**
  - FR : Livraison offerte dans Amiens, ou à emporter.
  - EN : Free delivery in Amiens, or takeaway.
- **call.cta**
  - FR : Appeler pour commander
  - EN : Call to order
- **platform.title**
  - FR : Sur Uber Eats
  - EN : On Uber Eats
- **platform.text**
  - FR : Si tu as déjà l'appli, ta commande part en deux clics.
  - EN : Already got the app? Your order is two taps away.
- **platform.cta**
  - FR : Commander sur Uber Eats
  - EN : Order on Uber Eats
- **form.title**
  - FR : À emporter, en ligne
  - EN : Takeaway, online
- **form.text**
  - FR : Choisis tes pizzas et ton heure de retrait. On te rappelle pour confirmer.
  - EN : Pick your pizzas and a pickup time. We'll call you back to confirm.
- **closedNote**
  - FR : Tu peux préparer ta commande maintenant pour le prochain service.
  - EN : You can get your order ready now for the next opening.
- **fields.lines**
  - FR : Ta commande
  - EN : Your order
- **fields.item**
  - FR : Article
  - EN : Item
- **fields.size**
  - FR : Taille
  - EN : Size
- **fields.qty**
  - FR : Quantité
  - EN : Quantity
- **fields.remove**
  - FR : Retirer
  - EN : Remove
- **fields.addLine**
  - FR : Ajouter un article
  - EN : Add an item
- **fields.day**
  - FR : Jour de retrait
  - EN : Pickup day
- **fields.time**
  - FR : Heure de retrait
  - EN : Pickup time
- **fields.name**
  - FR : Ton prénom
  - EN : Your first name
- **fields.phone**
  - FR : Ton téléphone
  - EN : Your phone number
- **fields.email**
  - FR : E-mail (pour recevoir le récapitulatif)
  - EN : Email (to get a summary)
- **fields.message**
  - FR : Une précision ?
  - EN : Anything else?
- **fields.messagePh**
  - FR : Sans olives, bien cuite, coupée en 8…
  - EN : No olives, well done, cut in 8…
- **fields.optional**
  - FR : facultatif
  - EN : optional
- **fields.submit**
  - FR : Envoyer ma commande
  - EN : Send my order
- **fields.sending**
  - FR : Envoi…
  - EN : Sending…
- **fields.noTime**
  - FR : Plus de créneau disponible ce jour-là.
  - EN : No time slots left that day.
- **sizes.S**
  - FR : S
  - EN : S
- **sizes.L**
  - FR : L
  - EN : L
- **sizes.XL**
  - FR : XL
  - EN : XL
- **sizes.XXL**
  - FR : XXL
  - EN : XXL
- **estimate**
  - FR : Total indicatif : {total}
  - EN : Estimated total: {total}
- **estimateNote**
  - FR : Selon la taille et les offres du jour, le prix exact est confirmé au téléphone. Paiement au retrait.
  - EN : Depending on size and today's deals, the exact price is confirmed on the phone. Pay when you pick up.
- **errors.lines**
  - FR : Ajoute au moins un article.
  - EN : Add at least one item.
- **errors.time**
  - FR : Choisis une heure de retrait.
  - EN : Pick a pickup time.
- **errors.name**
  - FR : Indique ton prénom.
  - EN : Tell us your first name.
- **errors.phone**
  - FR : Indique un numéro de téléphone valide.
  - EN : Enter a valid phone number.
- **errors.send**
  - FR : La commande n'est pas partie. Appelle-nous au 03 22 40 33 94, on la prend tout de suite.
  - EN : Your order didn't go through. Call us on 03 22 40 33 94 and we'll take it right away.
- **success.title**
  - FR : C'est noté, {name} !
  - EN : Got it, {name}!
- **success.text**
  - FR : Ta commande est arrivée en cuisine. On te rappelle au {phone} pour confirmer.
  - EN : Your order has reached the kitchen. We'll call you on {phone} to confirm.
- **success.pending**
  - FR : Merci {name} ! Pour être sûr que la cuisine l'a bien vue, appelle-nous au 03 22 40 33 94.
  - EN : Thanks {name}! To be sure the kitchen has seen it, give us a call on 03 22 40 33 94.
- **success.again**
  - FR : Nouvelle commande
  - EN : New order
- **mail.subject**
  - FR : Commande à emporter
  - EN : Takeaway order
- **mail.title**
  - FR : Nouvelle commande à emporter
  - EN : New takeaway order
- **mail.lines**
  - FR : Commande
  - EN : Order
- **mail.pickup**
  - FR : Retrait
  - EN : Pickup
- **mail.total**
  - FR : Total indicatif
  - EN : Estimated total
- **mail.name**
  - FR : Nom
  - EN : Name
- **mail.phone**
  - FR : Téléphone
  - EN : Phone
- **mail.email**
  - FR : E-mail
  - EN : Email
- **mail.message**
  - FR : Précision
  - EN : Note
- **mail.lang**
  - FR : Langue du client
  - EN : Customer language
- **mail.confirmSubject**
  - FR : Ta commande chez Mama La Pizza
  - EN : Your Mama La Pizza order
- **mail.confirmIntro**
  - FR : Merci {name}, on a bien reçu ta commande.
  - EN : Thanks {name}, we've got your order.
- **mail.confirmOutro**
  - FR : On te rappelle pour confirmer l'heure et le prix. À tout de suite au 15 rue des Otages !
  - EN : We'll call you to confirm the time and price. See you soon at 15 rue des Otages!

### group

- **eyebrow**
  - FR : Commandes de groupe
  - EN : Group orders
- **title**
  - FR : Anniversaire, bureau, soirée ?
  - EN : Birthday, office, party?
- **intro**
  - FR : Dis-nous combien vous êtes et pour quand. On te rappelle avec une proposition.
  - EN : Tell us how many of you there are and when. We'll call you back with a plan.
- **fields.type**
  - FR : C'est pour
  - EN : It's for
- **fields.types.birthday**
  - FR : Un anniversaire
  - EN : A birthday
- **fields.types.office**
  - FR : Le bureau
  - EN : The office
- **fields.types.party**
  - FR : Une soirée
  - EN : A party
- **fields.types.other**
  - FR : Autre chose
  - EN : Something else
- **fields.people**
  - FR : Nombre de personnes
  - EN : Number of people
- **fields.date**
  - FR : Date
  - EN : Date
- **fields.name**
  - FR : Ton prénom
  - EN : Your first name
- **fields.phone**
  - FR : Ton téléphone
  - EN : Your phone number
- **fields.message**
  - FR : Envies, horaire, adresse de livraison…
  - EN : Cravings, time, delivery address…
- **fields.submit**
  - FR : Envoyer la demande
  - EN : Send the request
- **success**
  - FR : Merci ! On te rappelle très vite pour organiser tout ça.
  - EN : Thanks! We'll call you back very soon to sort it all out.
- **pending**
  - FR : Merci ! Pour aller plus vite, appelle-nous au 03 22 40 33 94.
  - EN : Thanks! For a quicker answer, call us on 03 22 40 33 94.
- **error**
  - FR : La demande n'est pas partie. Appelle-nous au 03 22 40 33 94.
  - EN : Your request didn't go through. Call us on 03 22 40 33 94.

### infos

- **eyebrow**
  - FR : Infos pratiques
  - EN : Practical info
- **title**
  - FR : Viens nous voir
  - EN : Come and see us
- **address**
  - FR : Adresse
  - EN : Address
- **phone**
  - FR : Téléphone
  - EN : Phone
- **hours**
  - FR : Horaires
  - EN : Opening hours
- **days[1]**
  - FR : Lundi
  - EN : Monday
- **days[2]**
  - FR : Mardi
  - EN : Tuesday
- **days[3]**
  - FR : Mercredi
  - EN : Wednesday
- **days[4]**
  - FR : Jeudi
  - EN : Thursday
- **days[5]**
  - FR : Vendredi
  - EN : Friday
- **days[6]**
  - FR : Samedi
  - EN : Saturday
- **days[7]**
  - FR : Dimanche
  - EN : Sunday
- **closed**
  - FR : Fermé
  - EN : Closed
- **lunch**
  - FR : Midi
  - EN : Lunch
- **evening**
  - FR : Soir
  - EN : Evening
- **delivery**
  - FR : Livraison
  - EN : Delivery
- **deliveryText**
  - FR : Offerte dans Amiens quand tu commandes par téléphone. Aussi sur Uber Eats.
  - EN : Free in Amiens when you order by phone. Also on Uber Eats.
- **access**
  - FR : Accès
  - EN : Getting here
- **accessText**
  - FR : En plein centre, à quelques minutes à pied de la gare d'Amiens.
  - EN : Right in the city centre, a few minutes' walk from Amiens station.
- **route**
  - FR : Itinéraire
  - EN : Directions
- **mapTitle**
  - FR : Mama La Pizza sur la carte, 15 rue des Otages à Amiens
  - EN : Mama La Pizza on the map, 15 rue des Otages, Amiens
- **facadeAlt**
  - FR : La façade rose de Mama La Pizza, rue des Otages à Amiens
  - EN : The pink shopfront of Mama La Pizza, rue des Otages, Amiens
- **late**
  - FR : Ouvert jusqu'à 1 h du jeudi au samedi
  - EN : Open until 1 am Thursday to Saturday

### faq

- **eyebrow**
  - FR : Questions
  - EN : Questions
- **title**
  - FR : Tu te demandes…
  - EN : You might be wondering…
- **items[1].q**
  - FR : Où livrez-vous et c'est vraiment gratuit ?
  - EN : Where do you deliver, and is it really free?
- **items[1].a**
  - FR : Oui : la livraison est offerte dans Amiens quand tu commandes au 03 22 40 33 94. Appelle-nous pour vérifier ton adresse si tu es en périphérie. Sur Uber Eats, ce sont les frais de la plateforme qui s'appliquent.
  - EN : Yes: delivery is free in Amiens when you order on 03 22 40 33 94. If you're on the outskirts, call us to check your address. On Uber Eats, the platform's own fees apply.
- **items[2].q**
  - FR : Combien de temps pour être livré ?
  - EN : How long does delivery take?
- **items[2].a**
  - FR : Ça dépend de l’heure et de ton adresse : on te donne le délai au moment où tu commandes. Le vendredi et le samedi soir, prévois un peu de marge.
  - EN : It depends on the time and your address: we'll give you an estimate when you order. On Friday and Saturday nights, allow a little extra.
- **items[3].q**
  - FR : Jusqu'à quelle heure peut-on commander ?
  - EN : How late can I order?
- **items[3].a**
  - FR : Jusqu'à minuit du dimanche au mercredi, et jusqu'à 1 h du matin du jeudi au samedi. Le midi, on est ouverts de 11 h 30 à 14 h 30 du lundi au samedi.
  - EN : Until midnight Sunday to Wednesday, and until 1 am Thursday to Saturday. At lunchtime we're open 11:30 am to 2:30 pm, Monday to Saturday.
- **items[4].q**
  - FR : Quels moyens de paiement acceptez-vous ?
  - EN : How can I pay?
- **items[4].a**
  - FR : Tu paies au comptoir ou au livreur : il n'y a pas de paiement en ligne sur le site. Sur Uber Eats, tu paies dans l'appli.
  - EN : You pay at the counter or to the delivery driver: there's no online payment on this site. On Uber Eats, you pay in the app.
- **items[5].q**
  - FR : Et les allergènes ?
  - EN : What about allergens?
- **items[5].a**
  - FR : Nos pizzas contiennent du gluten et du lait, certaines de l'œuf, du poisson ou des fruits de mer. Dis-nous ton allergie à la commande, on te dit ce qui est possible.
  - EN : Our pizzas contain gluten and milk, and some contain egg, fish or seafood. Tell us about your allergy when you order and we'll tell you what's possible.
- **items[6].q**
  - FR : Vous faites les commandes de groupe ?
  - EN : Do you do group orders?
- **items[6].a**
  - FR : Oui, pour les anniversaires, le bureau ou les soirées. Remplis le petit formulaire « Commandes de groupe » ou appelle-nous, on prépare tout à l'heure dite.
  - EN : Yes, for birthdays, offices and parties. Fill in the short "Group orders" form or call us, and we'll have everything ready on time.

### footer

- **tagline**
  - FR : Pizzeria au cœur d'Amiens. Pâte maison, produits frais, et un ours qui ne dort pas avant 1 h.
  - EN : Pizzeria in the heart of Amiens. Homemade dough, fresh toppings, and a bear who never sleeps before 1 am.
- **menu**
  - FR : La carte
  - EN : Menu
- **legal**
  - FR : Mentions légales
  - EN : Legal notice
- **orderOn**
  - FR : Commander sur
  - EN : Order on
- **rights**
  - FR : © {year} Mama La Pizza · Amiens
  - EN : © {year} Mama La Pizza · Amiens

### carte

- **eyebrow**
  - FR : La carte
  - EN : The menu
- **title**
  - FR : Choisis ton camp
  - EN : Pick a side
- **intro**
  - FR : Tomate ou crème, classique ou Détroit. Tout est fait ici, la pâte aussi.
  - EN : Tomato or cream, round or Detroit. Everything is made here, dough included.
- **tabsLabel**
  - FR : Catégories de la carte
  - EN : Menu categories
- **tabs.tomate**
  - FR : Base tomate
  - EN : Tomato base
- **tabs.creme**
  - FR : Base crème
  - EN : Cream base
- **tabs.speciales**
  - FR : Spéciales & Détroit
  - EN : Specials & Detroit
- **tabs.cote**
  - FR : À côté
  - EN : Sides
- **tabs.desserts**
  - FR : Desserts
  - EN : Desserts
- **tabs.boissons**
  - FR : Boissons
  - EN : Drinks
- **tabIntro.tomate**
  - FR : Sauce tomate, mozzarella et double fromage. La base qui ne déçoit jamais.
  - EN : Tomato sauce, mozzarella and double cheese. The base that never lets you down.
- **tabIntro.creme**
  - FR : Crème fraîche, fromage qui file, garnitures généreuses. Pour les soirs où on ne compte pas.
  - EN : Crème fraîche, stretchy cheese, generous toppings. For the nights you don't count.
- **tabIntro.speciales**
  - FR : Nos recettes à part, et la Détroit : pâte épaisse, cuite en moule carré, bords croustillants au fromage.
  - EN : Our own recipes, and the Detroit: thick dough baked in a square pan, crispy cheesy edges.
- **tabIntro.cote**
  - FR : Pour picorer à côté, ou à partager si tu es généreux.
  - EN : To nibble on the side, or to share if you're feeling kind.
- **tabIntro.desserts**
  - FR : Il reste toujours une petite place.
  - EN : There's always a little room left.
- **tabIntro.boissons**
  - FR : Canettes bien fraîches.
  - EN : Ice-cold cans.
- **add**
  - FR : Je commande
  - EN : Order this
- **addLabel**
  - FR : Commander : {name}
  - EN : Order: {name}
- **sizes**
  - FR : Pizzas en S, L, XL et XXL au comptoir.
  - EN : Pizzas come in S, L, XL and XXL at the counter.
- **allergens**
  - FR : Allergènes (gluten, lait, œuf, poisson, fruits de mer…) : demande-nous au comptoir ou au téléphone avant de commander.
  - EN : Allergens (gluten, milk, egg, fish, seafood…): ask us at the counter or on the phone before you order.
- **checked**
  - FR : Prix relevés le {date}, susceptibles de changer.
  - EN : Prices checked on {date}, subject to change.
- **seeFull**
  - FR : Toute la carte sur une page
  - EN : The full menu on one page
- **detroit**
  - FR : Détroit
  - EN : Detroit

### offers

- **eyebrow**
  - FR : Les offres
  - EN : Deals
- **title**
  - FR : Les bons plans de Mama
  - EN : Mama's good deals
- **intro**
  - FR : Une offre presque tous les jours. Mama ne sait pas dire non.
  - EN : A deal nearly every day. Mama can't say no.
- **today**
  - FR : Aujourd'hui
  - EN : Today
- **modes.onsite**
  - FR : Sur place
  - EN : Dine-in
- **modes.takeaway**
  - FR : À emporter
  - EN : Takeaway
- **modes.delivery**
  - FR : En livraison
  - EN : Delivery
- **lunch**
  - FR : Le midi
  - EN : Lunchtime
- **fine**
  - FR : Offres non cumulables entre elles. Conditions détaillées au comptoir.
  - EN : Deals can't be combined. Full terms at the counter.
- **items.mardi.title**
  - FR : Le mardi
  - EN : Tuesdays
- **items.mardi.text**
  - FR : Sur toutes les pizzas.
  - EN : On every pizza.
- **items.mardi.bar**
  - FR : C'est mardi : −20 % sur toutes les pizzas, sur place et en livraison
  - EN : It's Tuesday: 20% off every pizza, dine-in and delivery
- **items.jeudi.title**
  - FR : Le jeudi
  - EN : Thursdays
- **items.jeudi.text**
  - FR : Sur les pizzas XL et XXL.
  - EN : On XL and XXL pizzas.
- **items.jeudi.bar**
  - FR : C'est jeudi : −20 % sur les pizzas XL et XXL, sur place, à emporter ou en livraison
  - EN : It's Thursday: 20% off XL and XXL pizzas, dine-in, takeaway or delivery
- **items.etudiant.title**
  - FR : Menu étudiant
  - EN : Student deal
- **items.etudiant.text**
  - FR : Une pizza S au choix ou une Détroit, avec une boisson.
  - EN : Any size S pizza or a Detroit, plus a drink.
- **items.midi.title**
  - FR : Pause déj'
  - EN : Lunch break
- **items.midi.text**
  - FR : Une pizza L et une boisson, du lundi au vendredi de 11 h 30 à 14 h 30.
  - EN : A size L pizza and a drink, Monday to Friday, 11:30 am to 2:30 pm.
- **items.xxl.title**
  - FR : XXL : 1 + 1
  - EN : XXL: 1 + 1
- **items.xxl.text**
  - FR : Une pizza XXL achetée, la deuxième est offerte.
  - EN : Buy one XXL pizza, get the second one free.

### pages

- **carte.slug**
  - FR : carte
  - EN : menu
- **carte.metaTitle**
  - FR : Carte et prix des pizzas | Mama La Pizza Amiens
  - EN : Pizza menu and prices | Mama La Pizza Amiens
- **carte.metaDescription**
  - FR : Toute la carte de Mama La Pizza à Amiens : pizzas base tomate, base crème, Détroit, sides, desserts et boissons, avec les prix. Livraison offerte.
  - EN : The full Mama La Pizza menu in Amiens: tomato-base and cream-base pizzas, Detroit pizzas, sides, desserts and drinks, with prices. Free delivery.
- **carte.eyebrow**
  - FR : Mama La Pizza · Amiens
  - EN : Mama La Pizza · Amiens
- **carte.title**
  - FR : La carte
  - EN : The menu
- **carte.lead**
  - FR : Toutes nos pizzas, nos box à partager, les desserts et les boissons, avec les prix.
  - EN : All our pizzas, sharing boxes, desserts and drinks, with prices.
- **legal.slug**
  - FR : mentions-legales
  - EN : legal
- **legal.metaTitle**
  - FR : Mentions légales | Mama La Pizza
  - EN : Legal notice | Mama La Pizza
- **legal.title**
  - FR : Mentions légales
  - EN : Legal notice
- **legal.editor**
  - FR : Éditeur du site
  - EN : Publisher
- **legal.siret**
  - FR : SIRET
  - EN : SIRET
- **legal.director**
  - FR : Directeur de la publication
  - EN : Publication director
- **legal.host**
  - FR : Hébergement
  - EN : Hosting
- **legal.data**
  - FR : Données personnelles
  - EN : Personal data
- **legal.dataText**
  - FR : Les informations envoyées par les formulaires (prénom, téléphone, e-mail, commande) servent uniquement à préparer ta commande ou ta demande. Elles ne sont ni revendues ni utilisées pour de la publicité. Pour les faire supprimer, appelle le 03 22 40 33 94.
  - EN : Information sent through the forms (first name, phone, email, order) is only used to prepare your order or request. It is never sold or used for advertising. To have it deleted, call 03 22 40 33 94.
- **legal.photos**
  - FR : Photos
  - EN : Photos
- **legal.photosText**
  - FR : Toutes les photos et vidéos sont celles de Mama La Pizza.
  - EN : All photos and videos belong to Mama La Pizza.
- **legal.toConfirm**
  - FR : à compléter
  - EN : to be completed

### Textes alternatifs des photos

- `pizza-reine-gros-plan` : Pizza jambon, champignons et mozzarella, vue de dessus dans sa boîte / Ham, mushroom and mozzarella pizza in its box, seen from above
- `pizza-poivrons-assiette` : Pizza aux poivrons et viande servie sur une assiette blanche / Pizza with peppers and meat served on a white plate
- `pizza-chorizo-service` : Une serveuse présente une pizza bien garnie dans la salle rose / A server holding a loaded pizza in the pink dining room
- `part-de-pizza-tard` : Un client croque une part de pizza pepperoni / A customer biting into a slice of pepperoni pizza
- `salle-pizzas-a-partager` : Deux clients partagent des pizzas dans leurs boîtes roses, sous le néon Mama La Pizza / Two customers sharing pizzas from pink boxes under the Mama La Pizza neon
- `salle-neon-rose` : La salle rose et le néon de l'ours Mama La Pizza / The pink dining room and the Mama La Pizza bear neon
- `facade-rue-des-otages` : La façade rose de Mama La Pizza, rue des Otages / Mama La Pizza's pink shopfront on rue des Otages
- `pate-maison-petrin` : La pâte maison préparée en cuisine / Homemade dough being prepared in the kitchen
- `four-a-pizza` : Le four à pizza et les boîtes prêtes en cuisine / The pizza oven and boxes ready in the kitchen
- `pizza-en-salle` : Une pizza pepperoni et une boisson servies en salle / A pepperoni pizza and a drink served in the dining room
