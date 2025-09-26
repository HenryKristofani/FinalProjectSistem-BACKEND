import { getAllProducts } from '../models/Products.js';

export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}