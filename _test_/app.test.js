const fs = require('fs');

const request = require('supertest');

const app = require('../lib/app');
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

    expect(res.body).toEqual({ id: '1',  author: 'ben',
      title: 'jerry' });
  });
  /////////////////////author post test
  it('creates a new author via POST', async() => {
    const res = await request(app)
      .post('/api/v1/authors')
      .send({
        bio: 'ben',
        author_id: 'jerry'

      });

    expect(res.body).toEqual({ id: '1',  bio: 'ben',
      author_id: 'jerry' });
  });
});
