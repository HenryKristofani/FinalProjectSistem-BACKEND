import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Create new user
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username, created_at
  `;
  try {
    const result = await pool.query(query, [username, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Find user by username
export async function findUserByUsername(username) {
  const query = `
    SELECT * FROM users 
    WHERE username = $1
  `;
  try {
    const result = await pool.query(query, [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

// Get all users
export async function getAllUsers() {
  const query = `
    SELECT id, username, created_at 
    FROM users
    ORDER BY created_at DESC
  `;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}