const userController = require('../../controllers/user.controller')
const express = require('express');
const{query, body} = require('express-validator');
const {validate} = require('../../helpers');

const userRouter = express.Router();

userRouter.get('/',
    query('page').optional(),
    query('limit').optional(), 
    userController.allUsers)

userRouter.get('/:id',
    validate([query('id').trim()]), 
    userController.getUser)

userRouter.post('/register', validate([
    body('username'),
    body('password').isLength({min: 6}),
    body('email').isEmail(),
    body('dob').optional()
]),userController.createUser)

/** DELETE Methods */

userRouter.post('/delete/:id',validate([query('id').trim()]), userController.destroyUser)

module.exports = userRouter;