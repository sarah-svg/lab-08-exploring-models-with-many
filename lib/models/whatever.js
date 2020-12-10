const pool = require('../utils/pool');

///id
///title
///author///


module.exports = class Books {
    id;
    title;
    author;



    constructor(row) {
      this.id = row.id;
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
};
