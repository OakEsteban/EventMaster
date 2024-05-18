const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'demo3.linkisite.com',
    user: 'demo3linkisite_root',
    password: '',
    database: 'demo3linkisite_eventmaster'
});

module.exports.pool = pool;
