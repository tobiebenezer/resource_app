
const  apiRoutes = require('./app/src/routes/api.routes.js');
const express = require('express');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const app = express();
const db = require('./app/src/models');
const swaggerDocs = require('./swagger');
const { ExpressValidator } = require('express-validator');
const multer = require('multer');




const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.disable('x-powered-by');

//DB Creation
apiRoutes(app);

app.get('/',(req,res)=>{
    res.json({'message':"ok"})
});

/* Error Handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });

    return;
  });
  
/*validate files"*/
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('File size exceeds the limit (5 MB).');
    }
  }
  if (err) {
    return res.status(400).send(err.message);
  }
  next();
});

async function startServer() {
    await db.connect();
    await db.sync();

    app.listen(PORT, "0.0.0.0",()=>{
        console.log(`App is Listening at http://localhost:${PORT}`);
    });

    swaggerDocs(app,PORT);
}

 startServer();
// module.exports ={ startServer, app};


