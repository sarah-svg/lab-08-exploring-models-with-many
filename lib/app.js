require('dotenv').config();
const express = require('express');
const Books = require('./models/whatever');
const app = express();
app.use(express.json());

app.post('/api/v1/author', (req, res, next) => {
 

  Books
    .insert(req.body)
    .then(book => res.send(book))
    .catch(next);
});

//  console.log('hey');
















module.exports = app;
