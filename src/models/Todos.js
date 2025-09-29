import prisma from '../lib/prisma.js';

export async function getAllTodos() {
  return await prisma.todo.findMany({ orderBy: { id: 'asc' } });
}

export async function createTodo({ title, description, status, user_id, category_id }) {
  return await prisma.todo.create({
    data: { title, description, status, user_id, category_id }
  });
}

export async function updateTodo(id, { title, description, status, user_id, category_id }) {
  return await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, description, status, user_id, category_id }
  });
}

export async function deleteTodo(id) {
  return await prisma.todo.delete({
    where: { id: Number(id) }
  });
}
