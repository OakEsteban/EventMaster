const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Conexión a la base de datos cerrada');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('La base de datos tiene muchas conexiones');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Conexión a la base de datos rechazada');
//         }
//     }
//     if (connection) {
//         connection.release();
//         console.log('Conexión a la base de datos exitosa');
//     }
//     return;
// });

module.exports.pool = pool;
