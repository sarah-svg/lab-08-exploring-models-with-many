const pool = require('../utils/pool');

module.exports = class Author {
    id;
    bio;
    author_id;

    constructor(row) {
      this.id = row.id;
      this.bio = row.bio;
      this.author_id = row.author_id;
    }


    static async insert({ bio, author_id }) {
      const { rows } = await pool.query(
        'INSERT INTO authors (bio, author_id) VALUES ($1, $2) RETURNING * ',
        [bio, author_id]
      );
      return new Author(rows[0]);
      
    }


};
