import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Opinion System API',
            version: '1.0.0',
            description: 'API para un sistema de gestion de opniniones',
            contact: {
                name: 'Fredy Alexander García Sicajau',
                email: 'alexander.garcia.sicajau@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://127.0.0.1:3004/managementOpinion/v1'
            }
        ]
    },
    apis:[
        './src/auth/auth.routes.js'
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };