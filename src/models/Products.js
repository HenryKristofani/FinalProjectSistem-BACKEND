import prisma from '../lib/prisma.js';

export async function getAllProducts() {
  return await prisma.product.findMany({ orderBy: { id: 'asc' } });
}

export async function createProduct({ name, price, stock }) {
  return await prisma.product.create({
    data: { name, price, stock }
  });
}

export async function updateProduct(id, { name, price, stock }) {
  return await prisma.product.update({
    where: { id: Number(id) },
    data: { name, price, stock }
  });
}

export async function deleteProduct(id) {
  return await prisma.product.delete({
    where: { id: Number(id) }
  });
}
