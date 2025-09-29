import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

// Create new user
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { username, password: hashedPassword }
  });
}

// Find user by username
export async function findUserByUsername(username) {
  return await prisma.user.findUnique({
    where: { username }
  });
}

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, username: true, created_at: true },
    orderBy: { id: 'asc' }
  });
}