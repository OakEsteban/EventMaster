const express = require('express');
const morgan = require('morgan');


// Crear la aplicación Express
const app = express();
app.use(express.json());

// Definir una ruta de prueba para verificar la conexión
app.get('/', (req, res) => {
    res.send('Inicio del servidor Express');
});

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Importar rutas
const userRoutes = require('./routes/usersRoutes');
const eventCategoryRoutes = require('./routes/eventCategoryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

// Routes
app.use('/users', userRoutes); 
app.use('/eventCategory', eventCategoryRoutes); 
app.use('/event', eventRoutes);
app.use('/registration', registrationRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

