import { getAllCategories } from '../models/Categories.js';

export async function getCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}