//Récupère le numéro de page, et on continue
// function ShowUsers() {
//   const nbPage = document.getElementById("numberPageUsers").value;
//   getUsers(nbPage);
// }

const loader =
  '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

//Appel ajax et on continue c'est du GET
function getUsers(numeroPage) {
  document.getElementById("allUtilisateurs").innerHTML = loader;
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users?delay=2&page=" + numeroPage;
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
    if (i == currentPage) {
      htmlPagination +=
        '<button class="btn active" disabled> ' + i + "</button>";
    } else {
      htmlPagination +=
        '<button class="btn " onclick="getUsers(' +
        i +
        ') "> ' +
        i +
        "</button>";
    }
  }
  document.getElementById("pagination").innerHTML = htmlPagination;
}

document.addEventListener("DOMContentLoaded", function () {
  getUsers(1);
});

// MODIFICATION -> POST aller voir dans la doc

function createUser() {
  const xhr = new XMLHttpRequest();
  const url = "https://reqres.in/api/users";
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        console.log("Response = " + xhr.response);

        const object = JSON.parse(xhr.response);
        console.log(object);
      } else if (xhr.status === 404) {
        alert("Impossible de trouver l'url de la requête");
      } else {
        alert("Une erreur est survenue");
      }
    }
  });

  let myForm = new FormData();
  myForm.append("name", "Cyril");
  myForm.append("job", "Développeur");
  var object = {};
  myForm.forEach((value, key) => (object[key] = value));
  var json = JSON.stringify(object);

  //Conversion de mon objet en JSON
  //var json = convertToJson(myForm);
  xhr.send(json);
}

function createUserApiFetch() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json;charset=UTF-8");
  
  const body = JSON.stringify({
    name: "John",
    job: "Doe",
  });

  const init = {
    method: "POST",
    headers: headers,
    body: body,
  };

  fetch("https://reqres.in/api/users", init)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
  })
  .catch(error => alert("Erreur: " + error));
}

function convertToJson(datas) {
  var object = {};
  myForm.forEach((value, key) => (object[key] = value));
  return JSON.stringify(object);
}
