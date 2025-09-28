import pool from '../config/db.js';

export async function getAllProducts() {
  const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
  return result.rows;
}

export async function createProduct({ name, price, stock }) {
  const result = await pool.query(
    'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
    [name, price, stock]
  );
  return result.rows[0];
}

export async function updateProduct(id, { name, price, stock }) {
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *',
    [name, price, stock, id]
  );
  return result.rows[0];
}

export async function deleteProduct(id) {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}
