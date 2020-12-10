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

  it('creates a new via POST', async() => {
    const res = await request(app)
      .post('/api/v1/author')
      .send({
        author: 'ben',
        title: 'jerry'

      });

    expect(res.body).toEqual({ id: '1',  author: 'ben',
      title: 'jerry' });
  });

});
