const express = require('express');
const Authors = require('./models/Authors');
const Book = require('./models/Book');
const app = express();

app.use(express.json());


///crud book routs
app.post('/api/v1/books', (req, res, next) => {
  Book
    .insert(req.body)
    .then(book => res.send(book))
    .catch(next);
});

app.get('/api/v1/books/:id', (req, res, next) => {
  Book
    .findById(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});

app.get('/api/v1/books', (req, res, next) => {
  Book
    .find()
    .then(book => res.send(book))
    .catch(next);
});

app.put('/api/v1/books/:id', (req, res, next) => {
  Book
    .update(req.params.id, req.body)
    .then(book => res.send(book))
    .catch(next);
});

app.delete('/api/v1/books/:id', (req, res, next) => {
  Book
    .delete(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});

///crud authors
app.post('/api/v1/authors', (req, res, next) => {
  Authors
    .insert(req.body)
    .then(author => res.send(author))
    .catch(next);
});

app.get('/api/v1/authors/:id', (req, res, next) => {
  Authors
    .findById(req.params.id)
    .then(author => res.send(author))
    .catch(next);
});

app.get('/api/v1/authors', (req, res, next) => {
  Authors
    .find()
    .then(author => res.send(author))
    .catch(next);
});

app.put('/api/v1/authors/:id', (req, res, next) => {
  Authors
    .update(req.params.id, req.body)
    .then(author => res.send(author))
    .catch(next);
});

app.delete('/api/v1/authors/:id', (req, res, next) => {
  Authors
    .delete(req.params.id)
    .then(author => res.send(author))
    .catch(next);
});

module.exports = app;
