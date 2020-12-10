const communication = (() => {
    'use strict';
    const urlToServer = '.'; // change url when uploading to server if necessary

// general function for fetching (fetchOptions default value is empty object)
    const doFetch = async (url, fetchOptions = {}) => {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw  new Error('request failed');
        }
        return await response.json();
    };



// get all users
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

    const showStory = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            return await doFetch(urlToServer + '/story', options);
        } catch (e) {
            throw new Error(e.message);
        }
    };

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
        showStory,
        newStory,
        getUsers,
        login,
        register,
        logout,
    };
})();