const { servererror, notfound } = require("./utils")

const allUsers = {
    tags: ['Users'],
    summary: 'Retrieve all users with pagination',
    operationId: 'allUsers',
    parameters: {
        in: {
            name: "page",
            schema: {
                type: "integet",
                minimum: 1
            }
        },
        in: {
            name: "pageSize",
            schema: {
                type: "integet",
                minimum: 1
            }
        }
    },
    
    responses:{
        '200': {
            description: "Successful response",
            content:{
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            pagination: {
                                type: "object",
                                properties: {
                                    totalItems: {
                                        type: "integer",
                                        example: 1},
                                    totalPages: {
                                        type: "integer",
                                        example:1
                                    },
                                    currentPage: {
                                        type: "integer",
                                        example: 0
                                    },
                                    pageSize: {
                                        type: "integer",
                                        example: 20
                                    },
                                    hasNextPage: {
                                        type: "boolean",
                                        example: true
                                    },
                                    hasPreviousPage: {
                                        type: "boolean",
                                        example: false
                                    }
                                }
                            },
                            data: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "integer",
                                            example: 1
                                        },
                                        username: {
                                            type: "string",
                                            example: "Tobi"
                                        },
                                        password: {
                                            type: "string",
                                            example: "12345678"
                                        },
                                        dob: {
                                            type: "string",
                                            format: "date-time",
                                            example: "2002-04-04T00:00:00.000Z"
                                        },
                                        createAt : {
                                            type: "string",
                                            format: "date-time",
                                            example: "2024-09-05T16:07:18.154Z"
                                        },
                                        updatedAt:{
                                            type: "string",
                                            format: "date-time",
                                            example: "2024-09-05T16:07:18.154Z"
                                        }

                                    }
                                }
                            }
                        }
                        
                    }
                }
            }
        },
        '400': notfound,
        '500': servererror
    }

}

const getUserById = {
    tags: ['Users'],
    summary: 'Get user by ID',
    operationId: 'getUserById',
    parameters: [{
        name: "userId",
        in: "path",
        required: true,
        description: "The unique ID of the user",
        schema: {
            type: "string"
        }
    }],
    responses: {
        '200': {
            description: "Successfully retrieved user data",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: {
                                type: "integer",
                                example: 1
                            },
                            username: {
                                type: "string",
                                example: "Tobi"
                            },
                            password: {
                                type: "string",
                                example: "12345678"
                            },
                            email: {
                                type: "string",
                                example: "user@mail.com"
                            },
                            dob: {
                                type: "string",
                                format: "date-time",
                                example: "2002-04-04T00:00:00.000Z"
                            },
                            createdAt: {
                                type: "string",
                                format: "date-time",
                                example: "2024-09-05T16:50:37.952Z"
                            },
                            updatedAt: {
                                type: "string",
                                format: "date-time",
                                example: "2024-09-05T16:50:37.952Z"
                            }
                        }
                    }
                }
            }
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

const createUser = {
    tags: ['Users'],
    summary: 'Create user account',
    operationId: 'createUser',
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ['username', 'password', 'email', 'dob'],
                    properties: {
                        username: {
                            type: "string",
                            example: "mikedoe"
                        },
                        password: {
                            type: "string",
                            example: "12345678"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@mail.com"
                        },
                        dob: {
                            type: "string",
                            format: "date",
                            example: "2004-05-08"
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: "Created"
        },
        '409': notfound,
        '404': notfound,
        '500': servererror
    }
};

const deleteUserById = {
    tags: ['Users'],
    summary: 'Delete user by ID',
    operationId: 'deleteUserById',
    parameters: [{
        name: "userId",
        in: "path",
        required: true,
        description: "The unique ID of the user",
        schema: {
            type: "string"
        }
    }],
    responses: {
        '200': {
            description: "Removed"
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

module.exports = {
    "/api/users": {"get": allUsers},
    "/api/users/{userId}":{"get": getUserById},
    "/api/users/register":{post:createUser},
    "/api/users/delete/{userId}":{post :deleteUserById}
}