import pool from '../config/db.js';

export async function getAllCategories() {
  const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
  return result.rows;
}
