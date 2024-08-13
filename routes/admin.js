const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const funcionesFS=require('../data/funciones.js')
const DATA_PATH = path.join(__dirname, '../data');
const adminAuth = require('../middleware/auth.js');

//router.use(adminAuth);




// List articles with edit/delete options
router.get('/', (req, res) => {
    let articles = funcionesFS.readArticles();
    res.json(articles);
});

// Add new article
router.post('/article', (req, res) => {
    let { title, content, publishDate } = req.body;
    let articles =funcionesFS.readArticles();
    let id = articles.length + 1;
    articles.push({ id, title, content, publishDate });
    funcionesFS.writeArticles(articles);
    res.status(201).send('Article added');
});

// Update article
router.put('/article/:id', (req, res) => {
    let { title, content, publishDate } = req.body;
    let id = req.params.id;
    let articles =funcionesFS.readArticles();
    let index = articles.findIndex(article => article.id == id);
    if (index !== -1) {
        articles[index] = { id, title, content, publishDate };
        funcionesFS.writeArticles(articles);
        res.send('Article updated');
    } else {
        res.status(404).send('Article not found');
    }
});

// Delete article
router.delete('/article/:id', (req, res) => {
    let id = req.params.id;
    let articles =funcionesFS.readArticles();
    articles = articles.filter(article => article.id != id);
    funcionesFS.writeArticles(articles);
    res.send('Article deleted');
});

//logout basic 
// En tu archivo de rutas de admin
router.get('/logout', (req, res) => {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin area"');
    res.status(401).send('Logged out');  // Envía un estado 401 y pide nuevas credenciales
  });
  

module.exports = router;
