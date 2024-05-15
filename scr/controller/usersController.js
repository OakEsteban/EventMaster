const { pool } = require("../db");

const usersGetAll = async (req, res) => {
    let sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

module.exports = { usersGetAll };
