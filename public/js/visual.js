'use strict';
const url = '.'; // change url when uploading to server


const aloitus = document.querySelector('#aloitus');
const home = document.querySelector('#home');
const kirjautuminen = document.querySelector('#kirjautuminen');
const rek = document.querySelector('#rek');
const userInfo = document.querySelector('#userinfo');
const success = document.querySelector('#success');
const rekform = document.querySelector('#myForm');
const news = document.querySelector('#news');
const logOut = document.querySelector('#logOut');




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


logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const json = await communication.logout();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        alert('Kirjauduit Ulos!');
        // show/hide forms + cats
        aloitus.style.display = 'block';
        home.style.display = 'none';
    } catch (e) {
        alert(e.message);
    }
});



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
            alert('Rekisteröinti Onnistui!')

        }

    } catch (e) {
        alert(e.message);
    }
});

news.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(news);
    try {
        const json = await communication.newStory(data);
        // save token
        if (json.message === 'tarina ok') {
            // show/hide forms + cats
            news.style.display = 'none';
            alert('Uusi Tarina Luotu!')

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