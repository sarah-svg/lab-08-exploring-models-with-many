const pool = require('../utils/pool');

module.exports = class Author {
  id;
  author;


  constructor(row) {
    this.id = row.id;
    this.author = row.author;

  }


  static async insert({ author }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (author) VALUES ($1) RETURNING * ',
      [author]
    );
    return new Author(rows[0]);

  }
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM authors WHERE id = $1',
      [id]


    );
    if (!rows[0]) throw Error(`no authors with id ${id}`);
    return new Author(rows[0]);
  }


  static async find() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map(row => new Author(row));
  }
  static async update(id, { author }) {
    const { rows } = await pool.query(
      'UPDATE authors SET author=$1 WHERE id=$2 RETURNING *',
      [author, id]
    );
    if (!rows[0]) throw new Error(`no author with id ${id} exists`);
    return new Author(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM authors WHERE id=$1 RETURNING *',
      [id]
    );
    return new Author(rows[0]);
  }

};
//  static async findById(id) {
//     const { rows } = await pool.query(
//       'SELECT * FROM authors WHERE id = $1',
//       [id]


//     );
//     if(!rows[0]) throw Error(`no authors with id ${id}`);
//     return new Author(rows[0]);
//   }
