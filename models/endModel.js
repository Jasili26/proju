const pool = require('../database/db');
const promisePool = pool.promise();


const getAllEnds = async () => {
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner name too.
        const [rows] = await promisePool.query('SELECT * FROM end WHERE ready = 0 ORDER BY RAND() LIMIT 1;');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('userModel error', e.message);
        return {error: 'DB Error'};
    }
};

const addEnd = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO end (text) VALUES (?)',
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
    getAllEnds,
    addEnd
};