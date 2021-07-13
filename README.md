# Affichage pour aider au déplacements dans l'autel de ville
Le but de cet afficheur est de faciliter les déplacements des administrés au sein de l'autel de ville.\
Il devra donc être possible de visualiser le chemin à emprunter pour se rendre dans différentes salles du bâtiment, ainsi que d'associer une salle à des réunions qui s'y déroulent, permettant ainsi aux administrés qui ne connaîtrait pas le nom de la salle de tout de même parvenir à se rendre à la réunion.

## Principe de la solution
La solution est composée de trois parties dictinctes (et donc trois applications distinctes):\

### Afficheur
Cette application gère l'affichage à proprement parler des directions.
Dans son mode d'affichage par defaut, l'application récupère les trois prochaines réservations planifiées dont la fin n'est pas encore dépassée. Ces trois réservations sont affichées en bas de l'écran et une bande noire entoure celle qui est actuelement selectionnée, La partie supérieure est décomposée en deux barres verticales, à gauche se trouve le plan du premier étage (ou est installé l'afficheur) et en dessous de celui-ci le plan de l'étage ou se trouve la salle qui est réservée. Sur ces deux plans est dessiné le chemin qui est indiqué à l'administré pour se rendre dans la salle. Sur la partie de droite, un maximum de quatres étapes écrites permettent de décrire verbalement le chemin à suivre.\
Lorsqu'il ne reste plus de réservations pour la journée, cette page est remplacée par le message "Il n'y a plus aucune réunion de prévue aujourd'hui"\\

L'afficheur a un second mode d'affichage "directions" qui est déclanché par l'action d'un agent d'acceuil -- sur l'application "Client" décrite plus loin -- pour diriger l'administré vers un service en particulier ou une salle dans laquelle il n'ay aurait pas de réservation. Cet affichage reprends à l'identique la partie supérieure du mode décrit précedement, il n'affiche aucune réservation de salle et ajoute le message "Vous avez demandé ??" ou ?? corespond au service demandé.\

### Client
La partie opérée par un agent d'acceuil.\
Elle se compose d'un ensemble de boutons qui permettent d'envoyer la demande à l'afficheur de changer l'affichage du mode par defaut au mode "directions" et d'afficher les directions pour se rendre au service correspondent au bouton appuié. L'affichage reviens alors automatiquement au mode par defaut après un delai prédefini dans le code.\

### Serveur
La partie qui fait la jonction entre les deux autres et qui s'occupe de la connexion à la base de donnée.\
Cette partie demande une interaction uniquement au moment du déploiment pour définir les options de connexion à la base de donnée, il suffit de modifier les informations dans la variable 'credentials' dans le fichier 'server/index.js'.\


# Installation
## Configuration
La solution est structurée autours d'une installation utilisant docker-compose pour créer des containers pour chacune des applications. L'environement de dévelopement incorpore une base de donnée teste qui sera remplacée par la base déjà en place pour la réservation des salles. L'installation docker-compose crée un sous-réseau auquel sont connectées les trois applications, sa configuration est décrite dans le fichier docker-compose.yml à la racine du projet, actuellement, docker alloue les adresses sur la plage 173.42.0.0/16 pour la solution, si ces adresses sont déjà utilisées par ailleurs, il faudra trouver une autre plage d'adresses. \
Dans le cas ou les adresses doivent être changées, il faudra répercuter ces changements dans les fichiers: 'afficheur/src/index.js', 'afficheur/src/planning.js' et 'client/src/index.js', tous en tête de fichier, ainsi que dans docker-compose.yml. Les applications utilisent les ports suivants pour communiquer, respectivement 3000, 3001, 3002 pour afficheur, server et client. Si pour une quelconque raison ces ports ne conviennent pas, il est possible de les modifier simplement dans les champs "ports" dans docker-compose.yml (est dans les addresses décrites précedement).

## Installation
Sur une machine linux (la distribution importe peu) il suffit d'installer les packages git, docker et docker-compose; clone ce repository et lancer les containers avec docker-compose:
Sous Debian/Ubuntu:
- - -	
	apt install git docker docker-compose
	git clone https://www.github.com/melurne/afficheur_stage && cd afficheur_stage
	docker-compose up --build
- - -
Pour récuperer la main sur le terminal après le lancement des containers il est possible d'ajouer l'option -d à la dernière commande mais dans ce cas la console des containers n'est pas affichée.



