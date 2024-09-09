const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./app/src/docs/apidoc');

function swaggerDocs(app,port){
    //swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
}

module.exports = swaggerDocs;