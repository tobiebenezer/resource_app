const lecture_note   = require("./lecture_notedoc");
const assessment   = require("./assessmentdoc");
const user = require("./userdoc");

module.exports = {

    openapi: "3.0.0",
    info: {
        title: process.env.APP_NAME || 'RESOURCE_HUB',
        contact: {
            name: "Dev",
            email: "info@resource-hub.com",
            url: "https://resource-hub.com"
        },
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://resource-hub.com",
            description: "Production Server"
        }
    ],
    tags: ['Users'],
    apis:[],
    // apis:['./app/src/routes/*.js','./app/src/routes/*/*.js'],
    paths:{
        ...user,
        ...lecture_note,
        ...assessment
    },
    components: {
        schemas: {
    
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                // bearerFormat: 'JWT'
            }
        }
    }
}
