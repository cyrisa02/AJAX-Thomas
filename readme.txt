Appel AJAX -  Studi dynamiser vos sites web avec Javaszcript
https://github.com/ThomasBDC/StudiLive2022ProjetJS

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

Live 2 

Choisir la BD - > modifier les paramètres de xhr.open("GET", "https://reqres.in/api/users?page=1");
-> créer une focntion getUsers

on a modifié tout le html du coup la fonction Showuser n'est plus appelé et plus utile, on appelle getUsers(1) pour la page 1

on est obligé de mettre 
document.addEventListener("DOMContentLoaded", function() {
  getUsers(1);
});
pour une histoire de DOM-rendu-asynchrone

mise en place d'un loader
https://loading.io/css

copier et ajouter le css
copier  le html
puis dans le fichier .js, en ahut du fichier 
const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
puis par défaut dans le html dans la div users-container 
<div class="users-container" id="allUtilisateurs">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <i>Ici seront affichés les utilisateurs</i>
    </div>

    + dans le js

    function getUsers(numeroPage) {
  document.getElementById("allUtilisateurs").innerHTML = loader;
  const xhr = new XMLHttpRequest();

  attention au bcg qui peut être de la même couleur 
   rajouter du délai avec delay
    const url = "https://reqres.in/api/users?delay=2&page=" + numeroPage;

Live 3 
CRUD 
Postman : requete AJAX 
http verbs: GET / POST / PUT / DELETE c'est le CRUD
GET    -> Récupération
POST   -> Création
PUT    -> Modification  PATCH -> Modification partielle 
DELETE -> Suppression

 aller dans la doc et regarder pour CREATE la request, on a besoin d'un body =
 les deux champs name et job 
+ l'url est https://reqres.in/api/users on n'a pas besoin de la page 

pour vérifier que la requête focntionne, 
F12 / Network Fetch/XHR / Name choisir users cliquer puis Payload

On a besoin de:
- XMLHttpRequest = objet 
- URL= https://reqres.in/api/users
- Méthode /verb = POST 
- content-type: à l'intérieur du colis je veux du json xhr.setRequestHeader("Content-Type", "application/json;
charset=UTF-8");
- le contenu de ma requête (mes paramètres)
let myForm =  new FormData();
  myForm.append('name', 'Cyril');
  myForm.append('job', 'Développeur');
  var object = {};
  myForm.forEach((value,key) => object[key] = value);
  var json = JSON.stringify(object);



retour de l'appel ajax 
myForm on envoie le formulaire on crée un objet FormData , on définie le contenu , puis on 
convertit l'object en json 
et on envoie 

API Fetch
