/*jshint esversion: 6 */
const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Depois de criadas as tabelas, posso remover estas linhas
/*User.sync({
    force: false
});*/

module.exports = User;