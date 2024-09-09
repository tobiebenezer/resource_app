require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'resource-hub',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT || 'sqlite',
};