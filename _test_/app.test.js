

const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Authors = require('../lib/models/Authors');
const Book = require('../lib/models/Book');
const pool = require('../lib/utils/pool');

describe('books routes', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  ///post route new book
  it('creates a new book via POST', async() => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        genre: 'romance',
        biography: 'When a women finds love',
      });

    expect(res.body).toEqual({
      id: '1',
      genre: 'romance',
      biography: 'When a women finds love',
    });
  });
  ////get book by id


  it('finds a book and associates a author by id via GET', async() => {
    await Promise.all([
      { name: 'Sasha', address: 'Nashville TN' },
      { name: 'Sam', address: 'SanAntonio Tx' },
      { name: 'Zach', address: 'Boring Or' }
    ].map(book => Authors.insert(book)));

    const book = await Book.insert({
      genre: 'Horror',
      biography: 'Scarey Town',
      authors: ['Sasha', 'Sam']
    });

    const response = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(response.body).toEqual({
      ...book,
      authors: ['Sasha', 'Sam']
    });

  });
  //git all books
  it('finds all books via GET', async() => {
    const books = await Promise.all([
      {
        genre: 'romance',
        biography: 'when a man finds love',
      },
      {
        genre: 'horror',
        biography: 'Small town spooky past',
      },
      {
        genre: 'mystery',
        biography: 'Search for the strangler',
      }
    ].map(book => Book.insert(book)));

    const res = await request(app)
      .get('/api/v1/books');

    expect(res.body).toEqual(expect.arrayContaining(books));
    expect(res.body).toHaveLength(books.length);
  });
  //////update book
  it('updates a book via PUT', async() => {
    const book = await Book.insert({
      genre: 'action',
      biography: 'Hope is lost help them find the fairy',
    });

    const res = await request(app)
      .put(`/api/v1/books/${book.id}`)
      .send({
        genre: 'fantasy',
        biography: 'Hope is lost help them find the fairy',
      });

    expect(res.body).toEqual({
      id: book.id,
      genre: 'fantasy',
      biography: 'Hope is lost help them find the fairy',
    });

  });
  ///delete book
  it('removes a book via DELETE', async() => {
    const book = await Book.insert({
      genre: 'fantasy',
      biography: 'Hope is lost help them find the fairy',
    });

    const response = await request(app)
      .delete(`/api/v1/books/${book.id}`);

    expect(response.body).toEqual(book);
  });
  /////new author
  it('creates a new author via POST', async() => {
    const res = await request(app)
      .post('/api/v1/authors')
      .send({
        name: 'Sasha',
        address: 'New York NY',
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Sasha',
      address: 'New York NY',
    });
  });
  ////author by id
  it('finds a author by id via GET', async() => {
    const author = await Authors.insert({
      name: 'Sasha',
      address: 'Nashville TN',
    });

    const res = await request(app)
      .get(`/api/v1/authors/${author.id}`);

    expect(res.body).toEqual(author);
  });
  ///all authors
  it('finds all authors via GET', async() => {
    const authors = await Promise.all([
      {
        name: 'Sasha',
        address: 'Portland OR',
      },
      {
        name: 'Jamie',
        address: 'Nashville TN',
      },
      {
        name: 'Sam',
        address: 'Vancouver WA',
      }
    ].map(author => Authors.insert(author)));

    const res = await request(app)
      .get('/api/v1/authors');

    expect(res.body).toEqual(expect.arrayContaining(authors));
    expect(res.body).toHaveLength(authors.length);
  });
  ///update author
  it('updates a author via PUT', async() => {
    const author = await Authors.insert({
      name: 'Sasha',
      address: 'Vancouver WA',
    });

    const res = await request(app)
      .put(`/api/v1/authors/${author.id}`)
      .send({
        name: 'Sasha',
        address: 'Vancouver BC',
      });

    expect(res.body).toEqual({
      id: author.id,
      name: 'Sasha',
      address: 'Vancouver BC',
    });

  });
  ///delete author
  it('removes a author via DELETE', async() => {
    const author = await Authors.insert({
      name: 'Sasha',
      address: 'Seattle, WA',
    });

    const response = await request(app)
      .delete(`/api/v1/authors/${author.id}`);

    expect(response.body).toEqual(author);
  });
});
