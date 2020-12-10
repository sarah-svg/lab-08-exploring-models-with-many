const pool = require('../utils/pool');

///id
///title
///author///


module.exports = class Books {
    id;
    title;
    author;



    constructor(row) {
      this.id = String(row.id);
      this.title = row.title;
      this.author = row.author;
    }


    static async insert({ title, author }) {
      const { rows } = await pool.query(
        'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING * ',
        [title, author]
      );
      return new Books(rows[0]);
    
    }
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM books WHERE id = $1',
        [id]
         
    
      );
      if(!rows[0]) throw Error(`no books with id ${id}`);
      return new Books(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query('SELECT * FROM books');
      return rows.map(row => new Books(row));
    }
    static async update(id, { title, author }) {
      const { rows } = await pool.query(
        'UPDATE books SET title=$1, author=$2 WHERE id=$3 RETURNING *',
        [title, author, id]
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
