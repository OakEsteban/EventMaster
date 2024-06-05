const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app.js']; // Ruta al archivo principal de tu aplicación

const doc = {
  info: {
    title: 'EventMaster',
    description: 'Api de eventmaster',
  },
  host: 'localhost:3200', // Cambia esto con el host y puerto de tu aplicación
  basePath: '/',
};

swaggerAutogen(outputFile, endpointsFiles, doc);
