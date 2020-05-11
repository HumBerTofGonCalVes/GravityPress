/*jshint esversion: 6 */
const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); //Uma categoria tem muitos artigos (1 x N)
Article.belongsTo(Category); //Um artigo pertence a uma categoria (1 x 1)

//Depois de criadas as tabelas, remover estas linhas
/*Article.sync({
    force: true
});*/

module.exports = Article;