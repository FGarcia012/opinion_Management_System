import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Opinion Management System API',
            version: '1.0.0',
            description: 'API para un sistema de gestión de opiniones',
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
    apis: [
        './src/auth/auth.routes.js',
        './src/user/user.routes.js',
        './src/publication/publication.routes.js',
        './src/category/category.routes.js',
        './src/comment/comment.routes.js'
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };