/*jshint esversion: 6 */
//database connection

const Sequelize = require('sequelize');

const connection = new Sequelize('gravitypress', 'gravitydev', '123456AbC', {
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: '+01:00'
});

module.exports = connection;