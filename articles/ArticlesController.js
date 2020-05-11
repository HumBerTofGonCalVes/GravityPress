/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.send('Rota de Artigos');
});

router.get('/admin/articles/new', (req, res) => {
    res.send('Rota para a criação de um novo artigo!');
});

module.exports = router;