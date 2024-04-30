const express = require('express');
const mysql = require('mysql');

// Crear la aplicación Express
const app = express();

// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
    connectionLimit : 10, // número máximo de conexiones simultáneas
    host: 'demo3.linkisite.com',
    user: 'demo3linkisite_root',
    password: '',
    database: 'demo3linkisite_eventmaster'
});

// Comprobar la conexión inicial al pool
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión con la base de datos fue cerrada.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('La conexión con la base de datos fue rechazada.');
        }
        throw err;
    }
    if (connection) connection.release();
    console.log('Pool conectado a la base de datos MySQL');
    return;
});

// Definir una ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
    res.send('Inicio del servidor Express');
});

// Definir una ruta para obtener datos de la base de datos usando el pool
app.get('/datos', (req, res) => {
    let sql = 'SELECT * FROM prueba';
    pool.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/datos', (req, res) => {
    let sql = 'INSERT INTO prueba (message) VALUES (1)';
    pool.query(sql, (err) => {
        res.send('dato insertado');
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
