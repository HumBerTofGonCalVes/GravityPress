/*jshint esversion: 6 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const article = require('./articles/Article');
const Category = require('./categories/Category');

//View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Database
connection.authenticate().then(() => {
    console.log('Conexão à base de dados com sucesso!');
}).catch((e) => {
    console.log('Ocorreu um erro na conexão à base de dados: ' + e);
});

//Routes
app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
    res.render('./index');
    //res.send("Bem vindo ao site da Gravity!");
});

//Server
app.listen(8080, () => {
    console.log('Servidor a funcionar com sucesso!');
});