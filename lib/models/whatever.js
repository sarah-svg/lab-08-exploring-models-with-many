const { Pool } = require('pg');
const pool = require('../utils/pool');

///id
///title
///author///


module.exports = class Books {
    id;
    title;
 



    constructor(row) {
      this.id = String(row.id);
      this.title = row.title;
      
    }


    // static async insert({ title, author }) {
    //   const { rows } = await pool.query(
    //     'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING * ',
    //     [title, author]
    //   );
    //   return new Books(rows[0]);
    
    // }
    static async insert({ title, authors = [] }) {
      const { rows } = await pool.query(
        'INSERT INTO books (title) VALUES ($1) RETURNING * ',
        [title]
      );
      await pool.query(
        `INSERT INTO author_books (books_id, author_id)
        SELECT ${rows[0].id}, id FROM authors WHERE author = ANY($1::text[])`,
        [authors]
      );
      return new Books(rows[0]);
    
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT books.*,
          json_agg(author) AS authors
        FROM author_books
        JOIN  books
        ON author_books.books_id = books.id
        JOIN authors
        ON author_books.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
        [id]
         
    
      );
      if(!rows[0]) throw Error(`no books with id ${id}`);
      return {

        ...new Books(rows[0]),
        authors: rows[0].authors
      };
    }
    // static async findById(id) {
    //   const { rows } = await pool.query(
    //     'SELECT * FROM books WHERE id = $1',
    //     [id]
         
    
    //   );
    //   if(!rows[0]) throw Error(`no books with id ${id}`);
    //   return new Books(rows[0]);
    // }



    static async find() {
      const { rows } = await pool.query('SELECT * FROM books');
      return rows.map(row => new Books(row));
    }
    static async update(id, { title }) {
      const { rows } = await pool.query(
        'UPDATE books SET  title=$1 WHERE id=$3 RETURNING *',
        [title, id]
      );
      if(!rows[0]) throw new Error(`no book with id ${id} exists`);
      return new Books(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM books WHERE id=$1 RETURNING *',
        [id]
      );
      return new Books(rows[0]);
    }




};
