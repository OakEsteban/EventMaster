const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

// Crear la aplicación Express
const app = express();

// Configuración de CORS
app.use(cors());

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
const emailRoutes = require('./routes/emailRoutes');

// Routes
app.use('/users', userRoutes); 
app.use('/eventCategory', eventCategoryRoutes); 
app.use('/event', eventRoutes);
app.use('/registration', registrationRoutes);
app.use('/email', emailRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

