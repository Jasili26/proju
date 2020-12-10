const pool = require('../database/db');
const promisePool = pool.promise();

//not to get all stories only 1 random one
const getAllStories = async () => {
    try {

        const [rows] = await promisePool.query('SELECT * FROM story WHERE ready = 0 ORDER BY RAND() LIMIT 1;');
        console.log('rows');
        return rows;
    } catch (e) {
        console.log('userModel error', e.message);
        return {error: 'DB Error'};
    }
};
//insert input to story table
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