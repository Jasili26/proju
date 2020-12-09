'use strict';
const url = '.'; // change url when uploading to server


const aloitus = document.querySelector('#aloitus');
const home = document.querySelector('#home');
const kirjautuminen = document.querySelector('#kirjautuminen');
const rek = document.querySelector('#rek');
const userInfo = document.querySelector('#userinfo');
const success = document.querySelector('#success');
const rekform = document.querySelector('#myForm');


// login
kirjautuminen.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(kirjautuminen);
    try {
        const json = await communication.login(data);
        if (!json.user) {
            alert(json.message);
        } else {
            // save token
            sessionStorage.setItem('token', json.token);
            // show/hide forms + cats
            aloitus.style.display = 'none';
            home.style.display = 'block';
            userInfo.innerHTML = `Mukava nähdä ${json.user.username}!`;

        }
    } catch (e) {
        alert(e.message);
    }
});
/*
// logout
logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const json = await communication.logout();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        alert('You have logged out');
        // show/hide forms + cats
        aloitus.style.display = 'visible';
        home.style.display = 'block';
    } catch (e) {
        alert(e.message);
    }
});
*/


// submit register form
rek.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(rek);
    try {
        const json = await communication.register(data);
        // save token
        if (json.message === 'register ok') {
            // show/hide forms + cats
           // aloitus.style.display = 'none';
           // home.style.display = 'block';
            rekform.style.display = 'none';
            success.innerHTML = `Jippii Rekisteröinti onnistui! Kirjaudu sisään.`;

        }

    } catch (e) {
        alert(e.message);
    }
});

//
if (sessionStorage.getItem('token')) {
    aloitus.style.display = 'none';
    home.style.display = 'visible';

}