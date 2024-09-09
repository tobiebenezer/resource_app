const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
const FileHandler = require('./fileHandler.js');
const validate = require('./validator.js');
const Classes = require('./multi_inheritance.js');


module.exports = {
    uppercaseFirst,
    FileHandler,
    validate,
    Classes
}