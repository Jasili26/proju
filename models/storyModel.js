const pool = require('../database/db');
const promisePool = pool.promise();


const getAllStories = async () => {
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner name too.
        const [rows] = await promisePool.query('SELECT * FROM story WHERE ready = 0 ORDER BY RAND() LIMIT 1;');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('userModel error', e.message);
        return {error: 'DB Error'};
    }
};

const addStory = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO story (header, genre, teaser, ready) VALUES (?,?,?,0)',
            params
        );
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('userModel error', e.message);
        return {error: 'DB Error'};
    }
}



module.exports = {
    getAllStories,
    addStory
};