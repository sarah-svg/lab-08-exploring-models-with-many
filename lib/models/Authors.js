const pool = require('../utils/pool');

module.exports = class Authors {
  id;
  name;
  address;

  constructor(row) {
    this.id = String(row.id);
    this.name = row.name;
    this.address = row.address;
  }

  static async insert({ name, address }) {
    const results = await pool.query(
      'INSERT INTO authors (name, address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );

    return new Authors(results.rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM authors WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw Error(`No author with id ${id} found.`);

    return new Authors(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM authors');

    return rows.map(row => new Authors(row));
  }

  static async update(id, { name, address }) {
    const { rows } = await pool.query(
      `UPDATE authors
        SET name=$1,
            address=$2
        WHERE id=$3
        RETURNING *`,
      [name, address, id]
    );
    if(!rows[0]) throw Error(`No author with id ${id} found.`);

    return new Authors(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM authors WHERE id=$1 RETURNING *',
      [id]
    );

    return new Authors(rows[0]);
  }

};
