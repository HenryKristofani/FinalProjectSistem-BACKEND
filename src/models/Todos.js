import pool from '../config/db.js';

export async function getAllTodos() {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return result.rows;
}
