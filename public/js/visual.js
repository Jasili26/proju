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
const newe = document.querySelector('#newe');
const logOut = document.querySelector('#logOut');
const show = document.querySelector('#show');
const profiili = document.querySelector('#profiili');


// create user options to <select>
const showStory = async () => {
    const storyLists = await communication.showStorys();
    storyLists.forEach((list) => {
        // clear user list
        list.innerHTML = '';
        storyLists.forEach((stories) => {
            // create options with DOM methods
            const option = document.createElement('option');
            document.getElementById("osio1").innerHTML=stories.header;
            document.getElementById("osio2").innerHTML=stories.genre;
            document.getElementById("osio3").innerHTML=stories.teaser;
            console.log(stories.id);
            console.log(stories.header);
            console.log(stories.genre);
            console.log(stories.teaser);
            option.classList.add('light-border');


        });
    });
};

const showEnd = async () => {
    const endLists = await communication.showEnds();
    endLists.forEach((list) => {
        // clear user list
        list.innerHTML = '';
        endLists.forEach((ends) => {
            // create options with DOM methods
            const option = document.createElement('option');
            document.getElementById("osio4").innerHTML=ends.text;
            console.log(ends.id);
            console.log(ends.text);
            option.classList.add('light-border');


        });
    });
};

function showAB() {
    showStory();
    showEnd();
}

show.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(show);
    try {
        const json = await communication.showStorys(data);
        // save token
        if (json.message === 'ok') {
            showStory();


        }
    } catch (e) {
        alert(e.message);
    }
});



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
            profiili.innerHTML = `${json.user.username}`;

            showStory();
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
//uusitarina
news.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(news);
    try {
        const json = await communication.newStory(data);
        // save token
        if (json.message === 'tarina ok') {
            // show/hide forms + cats
            //news.style.display = 'none';
            alert('Uusi Tarina Luotu!')

        }

    } catch (e) {
        alert(e.message);
    }
});

newe.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(newe);
    try {
        const json = await communication.endStory(data);
        // save token
        if (json.message === 'end ok') {
            // show/hide forms + cats
            //newe.style.display = 'none';
            alert('Uusi Tarinan Lopetus Luotu!')

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