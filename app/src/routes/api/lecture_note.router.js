const express = require('express');
const Lecture_noteContoller = require('../../controllers/lecture_note.controller.js');
const fileValidator = require('../../helpers/filevalidator.js')
const {body, query} = require('express-validator');
const {validate} = require('../../helpers');
const upload = require('../../helpers/fileProcessing.js');


const lecture_noteRouter = express.Router();


lecture_noteRouter.post("/upload",
    upload.single('lecture_note'),
    validate([
        body('name'),
        body('courseCode')
    ])
    ,Lecture_noteContoller.createLecture_note)

lecture_noteRouter.get('/',
    query('page').optional(),
    query('limit').optional(), 
    Lecture_noteContoller.getLecture_note);

lecture_noteRouter.post('/delete/:id',
    validate([query('id').trim()]), 
    Lecture_noteContoller.deleteLecture_note);

lecture_noteRouter.get('/download/',
    validate([query('fileName').trim()]),
    Lecture_noteContoller.downloadLecture_note
);

lecture_noteRouter.post('/update/:id',
    upload.single('lecture_note'),
    validate([
        body('name'),
        body('courseCode')
    ])
    ,
    Lecture_noteContoller.updateLecture_note
);


module.exports = lecture_noteRouter