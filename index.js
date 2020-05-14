/*jshint esversion: 6 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const session = require('express-session');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UserController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//View Engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: 'asdfgsdfhjgjjl.jgfhjgfk',
    cookie: {
        maxAge: 30000000
    }
}));

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
app.use('/', usersController);

/*//Treino das sessions
app.get('/session', (req, res) => {
    req.session.treino = 'Formação Node.js';
    req.session.ano = 2019;
    req.session.email = "qualquercoisa@coisa.qualquer.com";
    req.session.user = {
        username: "humbertogoncalves",
        email: "email@email.com",
        id: 10
    };
    res.send('Sessão gerada!');
});

app.get('/leitura', (req, res) => {
    res.json({
        treino: req.session.treino,
        ano: req.session.ano,
        email: req.session.email,
        usuário: req.session.user
    });
});
//Treino das sessions*/

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'desc']
        ],
        limit: 2
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('./index', {
                articles: articles,
                categories: categories
            });
        });
    });
    //res.send("Bem vindo ao site da Gravity!");
});

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('./article', {
                    article: article,
                    categories: categories
                });
            });
        } else {
            res.redirect('/');
        }
    }).catch(e => {
        res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{
            model: Article
        }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('./index', {
                    articles: category.articles,
                    categories: categories
                });
            });
        } else {
            res.redirect('/');
        }
    }).catch(e => {
        res.redirect('/');
    });
});

//Server
app.listen(8080, () => {
    console.log('Servidor a funcionar com sucesso!');
});