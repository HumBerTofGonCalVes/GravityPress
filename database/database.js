/*jshint esversion: 6 */
//database connection

const Sequelize = require('sequelize');

const connection = new Sequelize('gravitypress', 'root', '123456AbC!', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+01:00'
});

module.exports = connection;