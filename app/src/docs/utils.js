
const servererror = {
    description: "Internal Server Error",
    content: {
        'application/json':{
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Internal Server Error'
                    }
                }
            }
        }
    }
}

const notfound = {
    description: "Not Found"
}

module.exports = {
    servererror,
    notfound
}