import { getAllCategories, createCategory as createCategoryModel, updateCategory as updateCategoryModel, deleteCategory as deleteCategoryModel } from '../models/Categories.js';

export async function getCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const category = await createCategoryModel(name);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const category = await updateCategoryModel(id, name);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await deleteCategoryModel(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}