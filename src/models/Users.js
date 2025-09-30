import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

// Create new user
export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { email, password: hashedPassword }
  });
}

// Find user by email
export async function findUserByUsername(email) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, email: true, created_at: true },
    orderBy: { id: 'asc' }
  });
}