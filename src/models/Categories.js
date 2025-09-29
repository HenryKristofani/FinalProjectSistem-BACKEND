import prisma from '../lib/prisma.js';

export async function getAllCategories() {
  return await prisma.category.findMany({ orderBy: { id: 'asc' } });
}

export async function createCategory(name) {
  return await prisma.category.create({
    data: { name }
  });
}

export async function updateCategory(id, name) {
  return await prisma.category.update({
    where: { id: Number(id) },
    data: { name }
  });
}

export async function deleteCategory(id) {
  return await prisma.category.delete({
    where: { id: Number(id) }
  });
}
