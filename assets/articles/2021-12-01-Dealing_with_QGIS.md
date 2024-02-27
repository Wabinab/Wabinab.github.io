# Dealing with QGIS
technology

This is not a actual blog post discussing on anything in particular. Rather, it's more like a diary of what is encountered, what is solved, as time passes. And it's more like a diary written to myself as well. 

After you download the QGIS software and installed it, then you have the basic things ready. The first error is accidentally closing the Layers and Explorer panels. This can be opened back with View --> Panel --> (whatever panel you want to open). 

Second thing met was QuickMapServices wasn't included with the default. It's a plugin to be downloaded and installed separately. Go to Extensions --> Install/Modify extensions, then search for QuickMapServices. 

Even then, you only have NASA and OSM available. To add say, Google Satellite, click on it and click Search QMS, and there will be a small panel opened up at the bottom right. Search for "Google Satellite" and add it to your Layers. 

Next, if your data is in UTM (Universal Transverse Mercator) not lat long, [check this out](https://www.youtube.com/watch?v=Cz4DutaXusg&ab_channel=HydroinformaticsAcademy).

Adding to the above, there are two things to talk about: 
1. Make sure you know your UTM zone or it'll go wrong. Sometimes however, if you're familiar with the data, you might discover that the shape that overlaps doesn't map what you expect, and you can retry until you get it correct. 
2. When you Export, make sure to choose **EPSG:4326 - WGS 84** or it won't end up with lat long coordinates. 

---

## En Français (cassé)

Après l'installation de QGIS, le première erreur est fermer la fenetre Couche est Explorateur. Tu veux rouvrir avec Vue --> Panneau --> (quand même les panneau pour ouvrir). 

La deuxième problème decouvrir est le QuickMapServices (dans l'anglais parce que cette extension pas supporté la français) est absent. Tu veux aller vers Extensions --> Installer/Gérer les extensions, après ça chercher la "QuickMapServices". 

Après l'installation, cliquer dans la bouton est tu seulement decouvrir NASA et OSM. Aller vers "Search QMS" et cliquer, et il y a une nouveau panneau ouvrir en bas à droite. Chercher pour "Google Satellite" et ajouter ça à ton Couche. 

Suivant, si les coordonnées est pas latitude et longitude (il est UTM), [regarde çette vidéo](https://www.youtube.com/watch?v=Cz4DutaXusg&ab_channel=HydroinformaticsAcademy) (vidéo dans l'anglais).

Deux trucs pour concentrer: 
1. Assurer tu sais où UTM zone les données est situé, ou tout les coordonnées aura erreur. Si tu es familier avec les données, tu veux essayer et decouvrir qui est correcte. 
2. Quand tu Exporter cette fichier, assurer tu choisissez **EPSG:4326 - WGS 84** ou les données est pas dans coordonnées latitude et longitude. 
