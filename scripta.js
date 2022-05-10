const usersP1Btn = document.getElementById('users-p1-tab');
const tabBtns = document.querySelectorAll('.nav-link');
const usersP1Content = document.getElementById('users-p1-content');
const table = document.querySelector('.table');
const tabPane = document.querySelectorAll('.users-content');
let resAllUser = [];
let res = '';

(function init() {
  requestAjax('GET', `https://reqres.in/api/users?delay=6&page=1/delay=5`, 0);
})();

const handleEditUser = (e) => {
  console.log('click table');
  console.log(e);
  console.log(e.target.innerText);
  console.log(resAllUser.find(`${e.target.innerText}`));
};

tabPane[2].addEventListener('click', handleEditUser);

[...tabBtns].forEach((btn) =>
  btn.addEventListener('click', handleDisplayUsers)
);
function handleDisplayUsers() {
  [...tabPane].forEach((el) => (el.innerHTML = ''));
  resAllUser = [];
  const pageNum = [...tabBtns].indexOf(this);
  if (pageNum == 0 || pageNum == 1) {
    requestAjax(
      'GET',
      `https://reqres.in/api/users?delay=6&page=${pageNum + 1}/delay=5`,
      pageNum
    );
  } else {
    requestAjax('GET', `https://reqres.in/api/users?page=1`, pageNum);
    requestAjax('GET', `https://reqres.in/api/users?delay=6&page=2`, pageNum);
  }
}
function requestAjax(method, url, pageNum, optAsync = true) {
  const xhr = new XMLHttpRequest();
  handleSpinner(pageNum);

  xhr.open(method, url);

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        res = JSON.parse(xhr.response);
        if (pageNum == 0 || pageNum == 1) {
          displayUsersTab(res, pageNum);
        } else {
          resAllUser.push(...res.data);
          console.log(resAllUser);
          if (resAllUser.length === 12) {
            displayAllUsersTab(resAllUser);
          }
        }
      } else if (xhr.status == 404) {
        // alert("Impossible de trouver l'url de la requête ajax");
        tabPane[
          pageNum
        ].innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="./assets/img/404.gif" width="100%" height="100%" style="position:absolute" frameBorder="0" allowFullScreen></iframe></div>`;
      } else {
        // alert('Une erreur est survenue');
        tabPane[
          pageNum
        ].innerHTML = `<div style="width:100%;height:0;padding-bottom:50%;left:25%;position:relative;" class="ms-auto"><iframe src="./assets/img/404.gif" width="100%" height="100%" style="position:absolute" frameBorder="0" allowFullScreen></iframe></div>`;
      }
    }
  });
  xhr.send();
}
function displayUsersTab(res, pageNum) {
  let usersCards = '';

  res.data.forEach((el) => {
    usersCards += `<div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-4">
    <div class="card" style="width: 18rem">
    <div class="card-header p-4">
    <div class="wrapper">
    <img src="${el.avatar}" class="card-img-top" alt="picture of ${el.avatar}" />
    </div>
    </div>
    <div class="card-body">
    <h5 class="card-title">${el.first_name} ${el.last_name}</h5>
    <p class="card-text">
    <img src="./assets/img/envelope.svg" alt="envelope mail" class="me-2"> ${el.email}
    </p>
    </div>
    </div>
    </div>
    `;
  });

  tabPane[pageNum].innerHTML = usersCards;
}

function displayAllUsersTab(resAllUser) {
  tabPane[2].innerHTML = '';
  const theadContent = ['id', 'Firstname', 'Lastname', 'Email'];
  const tableEl = document.createElement('table');
  const theadEl = document.createElement('thead');
  const trEl = document.createElement('tr');
  const tbodyEl = document.createElement('tbody');

  tableEl.classList.add('table', 'table-hover', 'mt-5', 'p-5');

  for (let i = 0; i < 4; i++) {
    let thEl = document.createElement('th');
    thEl.setAttribute('scope', 'col');
    thEl.innerText = theadContent[i];
    trEl.appendChild(thEl);
  }

  theadEl.appendChild(trEl);
  tableEl.appendChild(theadEl);

  resAllUser.forEach((el) => {
    let trEl = document.createElement('tr');
    let thId = document.createElement('th');
    let tdFirstname = document.createElement('td');
    let tdLastName = document.createElement('td');
    let tdEmail = document.createElement('td');
    thId.setAttribute('scope', 'row');
    thId.innerText = el.id;
    tdFirstname.innerText = el.first_name;
    tdLastName.innerText = el.last_name;
    tdEmail.innerText = el.email;
    trEl.appendChild(thId);
    trEl.appendChild(tdFirstname);
    trEl.appendChild(tdLastName);
    trEl.appendChild(tdEmail);
    tbodyEl.appendChild(trEl);
  });

  tableEl.appendChild(tbodyEl);
  tabPane[2].append(tableEl);
}

function handleSpinner(pageNum) {
  console.log('spinner fn');
  tabPane[pageNum].innerHTML =
    '<div class="loading-spinner"><div class="anim-spinner"><div></div><div></div><div></div><div></div></div></div>';
}
