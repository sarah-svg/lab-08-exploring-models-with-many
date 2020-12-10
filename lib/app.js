require('dotenv').config();
const express = require('express');
const Books = require('./models/whatever');
const app = express();
app.use(express.json());
const Author = require('./models/author');


/////post to books
app.post('/api/v1/books', (req, res, next) => {
 

  Books
    .insert(req.body)
    .then(book => res.send(book))
    .catch(next);
});

//  console.log('hey');
///post to author


app.post('/api/v1/authors', (req, res, next) => {
  Author
    .insert(req.body)
    .then(author => res.send(author))
    .catch(next);
});
















module.exports = app;
