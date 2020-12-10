const fs = require('fs');

const request = require('supertest');

const app = require('../lib/app');
const Author = require('../lib/models/author');
const Books = require('../lib/models/whatever');
const pool = require('../lib/utils/pool');



describe('app endpoints are correct', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));

  });

  afterAll(() => {
    return pool.end();
  });
  ////////book post test
  it('creates a new book via POST', async() => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        author: 'ben',
        title: 'jerry'

      });

    expect(res.body).toEqual({
      id: '1', author: 'ben',
      title: 'jerry'
    });
  });
  /////////////////////author post test
  it('creates a new author via POST', async() => {
    const res = await request(app)
      .post('/api/v1/authors')
      .send({
        bio: 'ben',
        author_id: 'jerry'

      });

    expect(res.body).toEqual({
      id: '1', bio: 'ben',
      author_id: 'jerry'
    });
  });
  ////////////////////////get book by id
  it('finds a book by id via GET', async() => {
    const book = await Books.insert({ title: 'hot', author: 'dry' });

    const response = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(response.body).toEqual(book);
  });

  it('finds a author by id via GET', async() => {
    const author = await Author.insert({      bio: 'ben',
      author_id: 'jerry' });

    const response = await request(app)
      .get(`/api/v1/authors/${author.id}`);

    expect(response.body).toEqual(author);
  });
  ///////////////get all authors and books
  it('finds all books via GET', async() => {
    const book = await Promise.all([
      {
        author: 'ben',
        title: 'jerry'
      },
      {
        author: 'ben',
        title: 'jerry'
      },
    ].map(book => Books.insert(book)));
    const res = await request(app)
      .get('/api/v1/books');

    expect(res.body).toEqual(expect.arrayContaining(book));
    expect(res.body).toHaveLength(book.length);
  });

  it('finds all author via GET', async() => {
    const author = await Promise.all([
      {
        id: '1', bio: 'ben',
        author_id: 'jerry'
      },
      {
        id: '1', bio: 'ben',
        author_id: 'jerry'
      },
    ].map(author => Author.insert(author)));
    const res = await request(app)
      .get('/api/v1/authors');

    expect(res.body).toEqual(expect.arrayContaining(author));
    expect(res.body).toHaveLength(author.length);
  });
  //////////////////updates books and authors
  it('updates a books via PUT', async() => {
    const book = await Books.insert({
      author: 'barry',
      title: 'jerry'
    });

    const res = await request(app)
      .put(`/api/v1/books/${book.id}`)
      .send({
        author: 'ben',
        title: 'jerry'
      });

    expect(res.body).toEqual({
      id: '1',
      author: 'ben',
      title: 'jerry'
    });
  });
  it('updates a author via PUT', async() => {
    const author = await Author.insert({
      bio: 'ben',
      author_id: 'jerry j'
    });

    const res = await request(app)
      .put(`/api/v1/authors/${author.id}`)
      .send({
        bio: 'ben',
        author_id: 'jerry'
      });

    expect(res.body).toEqual({
      id: '1',
      bio: 'ben',
      author_id: 'jerry'
    });
  });

  ///////////////////////////////////////////delete
  it('deletes a book via DELETE', async() => {
    const books = await Books.insert({
      author: 'ben',
      title: 'jerry'
    });

    const res = await request(app)
      .delete(`/api/v1/books/${books.id}`);

    expect(res.body).toEqual(books);
  });
  it('deletes a author via DELETE', async() => {
    const author = await Author.insert({
      bio: 'ben',
      author_id: 'jerry'
    });

    const res = await request(app)
      .delete(`/api/v1/authors/${author.id}`);

    expect(res.body).toEqual(author);
  });




});
