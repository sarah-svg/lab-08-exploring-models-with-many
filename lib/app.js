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
/////////////////////get by id routs
app.get('/api/v1/books/:id', (req, res, next) => {
  Books 
  
    .findById(req.params.id)
    .then(book => res.send(book))
    .catch(next);
  console.log('hey');
  
});  

app.get('/api/v1/authors/:id', (req, res, next) => {
  Author
    
    .findById(req.params.id)
    .then(author => res.send(author))
    .catch(next);
  console.log('hey');
    
});  
////////////////////////get all routs


app.get('/api/v1/books', (req, res, next) => {
  Books
    .find()
    .then(book => res.send(book))
    .catch(next);
});

app.get('/api/v1/authors', (req, res, next) => {
  Author
    .find()
    .then(author => res.send(author))
    .catch(next);
});

///////////////update
app.put('/api/v1/books/:id', (req, res, next) => {
  Books
    .update(req.params.id, req.body)
    .then(book => res.send(book))
    .catch(next);
    
});







module.exports = app;
