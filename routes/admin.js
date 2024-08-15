const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const funcionesFS=require('../data/funciones.js')
const DATA_PATH = path.join(__dirname, '../data');
const adminAuth = require('../middleware/auth.js');

//router.use(adminAuth);

let response1 = {
    message: "",
    status:""
}

// List articles with edit/delete options
router.get('/', (req, res) => {
    let articles = funcionesFS.readArticles();
    res.json(articles);
});

router.get('/adminView', (req, res) => {
    res.sendFile(path.join(__dirname, '../views','adminView.html')); 
});
router.get('/adminEdit', (req, res) => {
    res.sendFile(path.join(__dirname, '../views','adminEdit.html')); 
});
router.get('/adminAdd', (req, res) => {
    res.sendFile(path.join(__dirname, '../views','adminAdd.html')); 
});
// Add new article
router.post('/add', (req, res) => {
    let { title, content, publishDate } = req.body;
    
    let articles =funcionesFS.readArticles();
    let id = articles.length + 1;
    articles.push({ id, title, content, publishDate });
    funcionesFS.writeArticles(articles);
    res.status(201).send('Article added '+id);
});


// Update article
router.put('/upd/:id', (req, res) => {
    let { title, content, publishDate } = req.body;
    let id = parseInt(req.params.id);
    let articles =funcionesFS.readArticles();
    let index = articles.findIndex(article => article.id == id);
    let existingArticle = articles[index];
    let existingArticlebool = true;

    if (title === existingArticle.title && content === existingArticle.content && publishDate === existingArticle.publishDate) {
        existingArticlebool = false;
        response1.message = "No changes detected. Article not updated.";
        response1.status = "warning";
            return res.send(response1);
        }   

    if (index !== -1 && existingArticlebool) {
        articles[index] = { id, title, content, publishDate };
        funcionesFS.writeArticles(articles);
        response1.message = "Article updated";
        response1.status = "success";
        return res.send(response1);
    } else {
        return res.status(404).send('Article not found');
    }
});

// Delete article
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
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
