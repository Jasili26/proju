const communication = (() => {
    'use strict';
    const urlToServer = '.'; // change url when uploading to server if necessary

// general function for fetching
    const doFetch = async (url, fetchOptions = {}) => {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw  new Error('request failed');
        }
        return await response.json();
    };



// get users
    const getUsers = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/user', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };



// login
    const login = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            return await doFetch(urlToServer + '/auth/login', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };

// logout
    const logout = async () => {
        try {
            return await doFetch(urlToServer + '/auth/logout');
        } catch (e) {
            throw new Error(e.message);
        }
    };

//  register
    const register = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            return await doFetch(urlToServer + '/auth/register', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };
//get story
    const showStorys = async () => {
        try {
            console.log("communication");
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/story/show', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };
//get random storyend
    const showEnds = async () => {
        try {
            console.log("communication");
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/end/show', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };
//new story
    const newStory = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            return await doFetch(urlToServer + '/story/new', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };
//new end to story
    const endStory = async (data) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
            return await doFetch(urlToServer + '/end/new', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };

    return {
        endStory,
        showStorys,
        showEnds,
        newStory,
        getUsers,
        login,
        register,
        logout,
    };
})();