import { getAllTodos } from '../models/Todos.js';

export async function getTodos(req, res) {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}