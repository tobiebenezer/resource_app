const { servererror, notfound } = require('./utils');

// Upload assessment
const uploadAssessment= {
    tags: ['Assessments'],
    summary: 'Upload a new assessment',
    operationId: 'uploadassessmentNote',
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        assessment: {
                            type: 'string',
                            format: 'binary'
                        },
                        name: {
                            type: 'string',
                            example: 'Sample assessment'
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
            description: 'assessment uploaded successfully'
        },
        '400': notfound,
        '500': servererror
    }
};

// Get Assessments with pagination
const getAssessment = {
    tags: ['Assessments'],
    summary: 'Retrieve all Assessments with optional pagination',
    operationId: 'getassessmentNotes',
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
            description: 'Successfully retrieved Assessments',
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
                                        name: { type: 'string', example: 'Sample assessment' },
                                        courseCode: { type: 'string', example: 'CS101' },
                                        assessment_url: { type: 'string', example: '/files/sample-assessment.pdf' }
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

// Delete assessment by ID
const deleteAssessment= {
    tags: ['Assessments'],
    summary: 'Delete a assessment by ID',
    operationId: 'deleteassessmentNote',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
                type: 'string'
            },
            description: 'The ID of the assessment to delete'
        }
    ],
    responses: {
        '200': {
            description: 'assessment deleted successfully'
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

// Download assessment by file name
const downloadAssessment= {
    tags: ['Assessments'],
    summary: 'Download a assessment by file name',
    operationId: 'downloadassessmentNote',
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
            description: 'assessment downloaded successfully',
            content: {
                'application/pdf': {}
            }
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

// Update assessment
const updateAssessment= {
    tags: ['Assessments'],
    summary: 'Update an existing assessment',
    operationId: 'updateassessmentNote',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
                type: 'string'
            },
            description: 'The ID of the assessment to update'
        }
    ],
    requestBody: {
        required: true,
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        assessment: {
                            type: 'string',
                            format: 'binary'
                        },
                        name: {
                            type: 'string',
                            example: 'Updated assessment'
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
            description: 'assessment updated successfully'
        },
        '400': notfound,
        '404': notfound,
        '500': servererror
    }
};

module.exports = {
    "/api/assessment/upload": { post: uploadAssessment},
    "/api/assessment": { get: getAssessment },
    "/api/assessment/delete/{id}": { post: deleteAssessment},
    "/api/assessment/download": { get: downloadAssessment},
    "/api/assessment/update/{id}": { post: updateAssessment}
};

