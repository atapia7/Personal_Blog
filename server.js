require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.use(morgan('dev'));

// Static files
// Suponiendo que 'wwwroot' es el directorio correcto
app.use('/wwwroot', express.static('wwwroot'));
app.use(express.static('views'));

// Routes
app.use('/', require('./routes/blog'));
app.use('/admin', require('./routes/admin'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
