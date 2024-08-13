const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const funcionesFS=require('../data/funciones.js')
// Home page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Article page route
//  router.get('/article/:id', (req, res) => {
//    res.sendFile(path.join(__dirname, '../views', 'articleView.html'));
//  });


router.get('/garticle', (req, res) => {
  
  const idparam = parseInt(req.query.id, 10);
  console.log(idparam);
  let articles =funcionesFS.readArticles();
  const filteredArticles = articles.filter(article => article.id == idparam);
  res.json(filteredArticles);
});

module.exports = router;
