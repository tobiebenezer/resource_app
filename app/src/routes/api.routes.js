const lecture_noteRouter = require('./api/lecture_note.router.js');
const assessmentRouter = require('./api/assessment.router.js');
const userRouter = require('./api/user.router.js');

module.exports = (app)=>{
    app.use('/api/users',userRouter);
    app.use('/api/lecture_note',lecture_noteRouter);
    app.use('/api/assessment',assessmentRouter);
};

// module.exports = (app)=>{
//      app.use('/.netlify/functions/api/users',userRouter);
//      app.use('.netlify/functions/api/lecture_note',lecture_noteRouter);
//  };