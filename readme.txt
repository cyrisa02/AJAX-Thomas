Appel AJAX -  Studi dynamiser vos sites web avec Javaszcript


Barre de recherche : on interroge la BD sans rechargement de l’URL
 Methode : POST
en retour du serveur on obtient un json 

GET : récupère les informations (les paramètres sont dans l’URL)
POST : modifier les info (paramètres invisibles)

lettre recommandee
xhr.open : prend la lettre et la met ds l’enveloppe
xhr.send : amener à la poste
  : voir la boite aux lettres

readyState : 4 <=> DONE tout est ok + status : 200 <=> tout est ok

document.getElementById("allUtilisateurs").innerText = xhr.response;  permet d'afficher à l'écran le json brut 


PARSER LE fichier json= récuper la réponse JSON 
const object = JSON.parse(xhr.response);
pour voir la structure de mon tableau:
console log (object), on voit le array et data d'où 
maintenant je veux lire cette liste donc forEach 
