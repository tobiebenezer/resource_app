const { servererror, notfound } = require('./utils');

// Upload lecture note
const uploadLectureNote = {
    tags: ['Lecture Notes'],
    summary: 'Upload a new lecture note',
    operationId: 'uploadLectureNote',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        lecture_note: {
                            type: 'string',
                            format: 'binary'
                        },
                        name: {
                            type: 'string',
                            example: 'Sample Lecture'
                        },
                        courseCode: {
                            type: 'string',
                            example: 'CS101'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '201': {
            description: 'Lecture note uploaded successfully'
        },
        '400': notfound,
        '500': servererror
    }
};

// Get lecture notes with pagination
const getLectureNotes = {
    tags: ['Lecture Notes'],
    summary: 'Retrieve all lecture notes with optional pagination',
    operationId: 'getLectureNotes',
    parameters: [
        {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
                type: 'integer',
                minimum: 1
            }
        },
        {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
                type: 'integer',
                minimum: 1
            }
        }
    ],
    responses: {
        '200': {
            description: 'Successfully retrieved lecture notes',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            pagination: {
                                type: 'object',
                                properties: {
                                    totalItems: { type: 'integer', example: 100 },
                                    totalPages: { type: 'integer', example: 10 },
                                    currentPage: { type: 'integer', example: 1 },
                                    pageSize: { type: 'integer', example: 10 }
                                }
                            },
                            data: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer', example: 1 },
                                        name: { type: 'string', example: 'Sample Lecture' },
                                        courseCode: { type: 'string', example: 'CS101' },
                                        lecture_note_url: { type: 'string', example: '/files/sample-lecture.pdf' }
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
};

// Delete lecture note by ID
const deleteLectureNote = {
    tags: ['Lecture Notes'],
    summary: 'Delete a lecture note by ID',
    operationId: 'deleteLectureNote',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
                type: 'string'
            },
            description: 'The ID of the lecture note to delete'
        }
    ],
    responses: {
        '200': {
            description: 'Lecture note deleted successfully'
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

// Download lecture note by file name
const downloadLectureNote = {
    tags: ['Lecture Notes'],
    summary: 'Download a lecture note by file name',
    operationId: 'downloadLectureNote',
    parameters: [
        {
            name: 'fileName',
            in: 'query',
            required: true,
            schema: {
                type: 'string'
            },
            description: 'The name of the file to download'
        }
    ],
    responses: {
        '200': {
            description: 'Lecture note downloaded successfully',
            content: {
                'application/pdf': {}
            }
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

// Update lecture note
const updateLectureNote = {
    tags: ['Lecture Notes'],
    summary: 'Update an existing lecture note',
    operationId: 'updateLectureNote',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
                type: 'string'
            },
            description: 'The ID of the lecture note to update'
        }
    ],
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        lecture_note: {
                            type: 'string',
                            format: 'binary'
                        },
                        name: {
                            type: 'string',
                            example: 'Updated Lecture'
                        },
                        courseCode: {
                            type: 'string',
                            example: 'CS102'
                        }
                    }
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Lecture note updated successfully'
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

module.exports = {
    "/api/lecture_note/upload": { post: uploadLectureNote },
    "/api/lecture_note": { get: getLectureNotes },
    "/api/lecture_note/delete/{id}": { post: deleteLectureNote },
    "/api/lecture_note/download": { get: downloadLectureNote },
    "/api/lecture_note/update/{id}": { post: updateLectureNote }
};

