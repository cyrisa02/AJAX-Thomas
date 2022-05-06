function ShowUsers(){
    
    const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://reqres.in/api/users?page=2');

xhr.addEventListener('readystatechange', function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log("Response = " + xhr.response);
    };
});

xhr.send();
}

