// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Vía 38',
      version: '1.0.0',
      description: 'Documentación de la API para usuarios, departamentos y reservaciones',
      contact: {
        name: 'Soporte Vía 38',
        email: 'soporte@via38.mx',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
