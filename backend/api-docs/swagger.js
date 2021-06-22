const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'API Documents',
        version: '1.0.0'
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'token',
          scheme: 'bearer',
          in: 'header',
        },
      }
    },
    apis: ['./api-docs/config/config.yaml'],
  }


// initialize swagger-jsdoc
module.exports = swaggerJSDoc(swaggerOptions);