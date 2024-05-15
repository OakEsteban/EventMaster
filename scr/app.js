const express = require('express');
const morgan = require('morgan');

// Crear la aplicación Express
const app = express();

// Definir una ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
    res.send('Inicio del servidor Express');
});

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Importar rutas
const userRoutes = require('./routes/usersRoutes');

// Routes
app.use('/users', userRoutes); // Aquí puedes ajustar la ruta base si es necesario

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

