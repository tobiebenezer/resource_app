const {Sequelize} = require('sequelize');
const dbConfig = require('../config/db-config');

const sequelize = new Sequelize({
    dialect:dbConfig.DB_DIALECT,
    storage: `./${dbConfig.DB_NAME}.sqlite`
});

module.exports = sequelize;