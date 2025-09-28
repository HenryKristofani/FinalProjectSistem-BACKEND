import pool from '../config/db.js';

export async function getAllTodos() {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return result.rows;
}

export async function createTodo({ title, description, status, user_id, category_id }) {
  const result = await pool.query(
    `INSERT INTO todos (title, description, status, user_id, category_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, status, user_id, category_id]
  );
  return result.rows[0];
}

export async function updateTodo(id, { title, description, status, user_id, category_id }) {
  const result = await pool.query(
    `UPDATE todos SET title = $1, description = $2, status = $3, user_id = $4, category_id = $5
     WHERE id = $6 RETURNING *`,
    [title, description, status, user_id, category_id, id]
  );
  return result.rows[0];
}

export async function deleteTodo(id) {
  const result = await pool.query(
    'DELETE FROM todos WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}
