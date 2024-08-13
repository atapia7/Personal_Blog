const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data');

function readArticles() {
    try {
        let articles = fs.readFileSync(`${DATA_PATH}/articles.json`);
        
        return JSON.parse(articles);
    } catch (error) {
        return [];
    }
}

function writeArticles(articles) {
    fs.writeFileSync(`${DATA_PATH}/articles.json`, JSON.stringify(articles, null, 2));
}
module.exports = {
    readArticles,
    writeArticles
};