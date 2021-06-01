# Maquette d'afficheur de chemins dynamique
Le but de cet afficheur est de faciliter les déplassements des administrés au sein de l'autel de ville.
Il devra donc être possible de visualiser le chemin à emprunter pour se rendre dans différentes salles du bâtiment, ainsi que d'associer une salle à des réunions qui s'y déroulent, permettant ainsi aux administrés qui ne connaîtrait pas le nom de la salle de tout de même parvenir à se rendre à la réunion.

## Esquisse visuelle
Dans l'optique de rester le plus clair possible, il a été choisi de réaliser un plan étage par étage du bâtiment afin de pouvoir par la suite animer le chemin à prendre dans l'étage pour se rendre à l'étage suivant sur le chemin ou directement dans la salle recherchée.
En dessous de ce plan se trouvera une liste des réunions en cours ou sur le point de commencer. 
Seront indiqués dans cette liste: 
* L'heure à laquelle doit commencer la réunion
* Son intitulé
* La salle dans laquelle ele doit avoir lieu

On pourrait envisager de réaliser une interface physique afin de permettre aux usagers de parcourir la liste des réunions et faire afficher le chemin à emprunter.
Dans ce cas l'afficheur jouerai une animation _"idle"_ qui reste facultative.

Ci-dessous un exemple d'un tel affichage (sans animations):
Début du chemin:

![Begin path](./SVGs/debut_path.svg)

Fin du chemin:

![End path](./SVGs/fin_path.svg)

Il est évident que les choix graphiques sont ici temporaires et ne reflètent pas l'aspect graphique final de la solution, ces maquettes ne servent qu'à illustrer le principe de la solution présentée.

## Architecture programme
Il est proposé de travailler avec un affichage de type web via CSS/JS ou PHP et de réaliser les animations par l'intermédiaire de graphiques SVG dont les éléments pourront être utilisés et modifiés par du code CSS et ainsi permettre de génerer les animations automatiquement et ainsi eviter de réaliser à la main les animations pour se rendre dans chaque salle du bâtiment.
Pour ce qui est de la génération à proprement parler de ces chemins, il serait possible de représenter le bâtiment par une série de points par lesquels pourraient passer les administrés, et alors chaque chemin possible de l'afficheur à une salle pourrait être représentée par une liste ordonnée de ces points qui correspondraient à des coordonnées dans le SVG du plan. On pourra alors créer un vecteur ligne entre chacun des points à parcourir et ainsi animer ce chemin automatiquement.

Des framework comme ReacJS semblent bien adaptés pour la réalisation de cette partie.