const pool = require('../database/db');
const promisePool = pool.promise();

//not to get all ends just 1 random
const getAllEnds = async () => {
    try {

        const [rows] = await promisePool.query('SELECT * FROM end ORDER BY RAND() LIMIT 1;');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.log('userModel error', e.message);
        return {error: 'DB Error'};
    }
};
//insert text to end text
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