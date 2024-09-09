const express = require('express');
const AssessmentContoller = require('../../controllers/assessment.controller.js');
const fileValidator = require('../../helpers/filevalidator.js')
const {body, query} = require('express-validator');
const {validate} = require('../../helpers');
const upload = require('../../helpers/fileProcessing.js');


const assessmentRouter = express.Router();

assessmentRouter.post("/upload",
    upload.single('assessment'),
    validate([
        body('name'),
        body('courseCode')
    ])
    ,AssessmentContoller.createAssessment)

assessmentRouter.get('/',
    query('page').optional(),
    query('limit').optional(), 
    AssessmentContoller.getAssessment);

assessmentRouter.post('/delete/:id',
    validate([query('id').trim()]), 
    AssessmentContoller.deleteAssessment);

assessmentRouter.get('/download/',
    validate([query('fileName').trim()]),
    AssessmentContoller.downloadAssessment
);

assessmentRouter.post('/update/:id',
    upload.single('Assessment'),
    validate([
        body('name'),
        body('courseCode')
    ])
    ,
    AssessmentContoller.updateAssessment
);


module.exports = assessmentRouter