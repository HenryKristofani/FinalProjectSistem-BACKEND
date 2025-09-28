import { getAllTodos, createTodo as createTodoModel, updateTodo as updateTodoModel, deleteTodo as deleteTodoModel } from '../models/Todos.js';

export async function getTodos(req, res) {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createTodo(req, res) {
  try {
    const { title, description, status, user_id, category_id } = req.body;
    if (!title || !status || !user_id || !category_id) {
      return res.status(400).json({ message: 'title, status, user_id, category_id are required' });
    }
    const todo = await createTodoModel({ title, description, status, user_id, category_id });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status, user_id, category_id } = req.body;
    if (!title || !status || !user_id || !category_id) {
      return res.status(400).json({ message: 'title, status, user_id, category_id are required' });
    }
    const todo = await updateTodoModel(id, { title, description, status, user_id, category_id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await deleteTodoModel(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted', todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}