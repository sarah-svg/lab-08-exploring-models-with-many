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
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM authors WHERE id = $1',
        [id]
           
      
      );
      if(!rows[0]) throw Error(`no authors with id ${id}`);
      return new Author(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query('SELECT * FROM authors');
      return rows.map(row => new Author(row));
    }
    static async update(id, { bio, author_id }) {
      const { rows } = await pool.query(
        'UPDATE authors SET bio=$1, author_id=$2 WHERE id=$3 RETURNING *',
        [bio, author_id, id]
      );
      if(!rows[0]) throw new Error(`no author with id ${id} exists`);
      return new Author(rows[0]);
    }

};
