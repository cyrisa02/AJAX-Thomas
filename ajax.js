//Récupère le numéro de page, et on continue
// function ShowUsers() {
//   const nbPage = document.getElementById("numberPageUsers").value;
//   getUsers(nbPage);
// }

//Appel ajax et on continue
function getUsers(numeroPage) {
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users?page=" + numeroPage;
  xhr.open("GET", url);

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Response = " + xhr.response);

        const object = JSON.parse(xhr.response);

        setUsersInPage(object);
      } else if (xhr.status === 404) {
        alert("Impossible de trouver l'url de la requête");
      } else {
        alert("Une erreur est survenue");
      }
    }
  });
  xhr.send();
}

//On affiche le résultat de l'appel ajax dans la page

function setUsersInPage(listUsers) {
  // On ajoute la liste des utilsiateurs
  let myhtml = "";
  listUsers.data.forEach((element) => {
    myhtml +=
      '<div><img src=" ' +
      element.avatar +
      ' "/><p>' +
      element.first_name +
      " " +
      element.last_name +
      "</p> </div>";
  });

  document.getElementById("allUtilisateurs").innerHTML = myhtml;

  // On crée une pagintaion
  let nbPage = listUsers.total_pages;
  let currentPage = listUsers.page;

  let htmlPagination = "";

  for (let i = 1; i <= nbPage; i++) {
    if(i == currentPage){
      htmlPagination +=
      '<button class="btn active" disabled> '+ i + '</button>'
    }
    else{
      htmlPagination +=
      '<button class="btn " onclick="getUsers(' + i + ') "> '+ i + '</button>'
    }
    
  }
  document.getElementById("pagination").innerHTML = htmlPagination;
}




document.addEventListener("DOMContentLoaded", function() {
  getUsers(1);
});