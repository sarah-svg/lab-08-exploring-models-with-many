const pool = require('../utils/pool');

module.exports = class Book {
  id;
  genre;
  biography;

  constructor(row) {
    this.id = String(row.id);
    this.genre = row.genre;
    this.biography = row.biography;
  }

  static async insert({ genre, biography, authors = [] }) {
    const { rows } = await pool.query(
      'INSERT INTO books (genre, biography) VALUES ($1, $2) RETURNING *',
      [genre, biography]
    );

    await pool.query(
      `INSERT INTO books_authors (book_id, authors_id)
        SELECT ${rows[0].id}, id FROM authors WHERE name = ANY($1::text[])`,
      [authors]
    );
    return new Book(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT 
        books.*,
        json_agg((authors.name)) AS authors
      FROM
        books_authors
      JOIN books
      ON books_authors.book_id = books.id
      JOIN authors
      ON books_authors.authors_id = authors.id
      WHERE books.id=$1
      GROUP BY books.id`,
      [id]
    );

    if(!rows[0]) throw new Error(`No books found with id of ${id}`);

    return {
      ...new Book(rows[0]),
      authors: rows[0].authors
    };
  }


  static async find() {
    const { rows } = await pool.query('SELECT * FROM books');

    return rows.map(row => new Book(row));
  }

  static async update(id, { genre, biography }) {
    const { rows } = await pool.query(
      `UPDATE books
        SET genre=$1,
            biography=$2
        WHERE id=$3
        RETURNING *`,
      [genre, biography, id]
    );
    if(!rows[0]) throw Error(`No book with id ${id} found.`);

    return new Book(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM books WHERE id=$1 RETURNING *',
      [id]
    );

    return new Book(rows[0]);
  }

};
