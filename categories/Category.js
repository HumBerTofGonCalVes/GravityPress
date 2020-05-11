/*jshint esversion: 6 */
const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Depois de criadas as tabelas, remover estas linhas
/*Article.sync({
    force: true
});*/

module.exports = Category;