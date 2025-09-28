import { getAllProducts, createProduct as createProductModel, updateProduct as updateProductModel, deleteProduct as deleteProductModel } from '../models/Products.js';

export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'name, price, stock are required' });
    }
    const product = await createProductModel({ name, price, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'name, price, stock are required' });
    }
    const product = await updateProductModel(id, { name, price, stock });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await deleteProductModel(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}