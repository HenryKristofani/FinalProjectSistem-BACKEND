import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername, getAllUsers } from '../models/Users.js';

// Store blacklisted/invalidated tokens
export const tokenBlacklist = new Set();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const userExists = await findUserByUsername(username);
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create user
    const user = await createUser(username, password);

    // Create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private
export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc    Logout user / Invalidate token
// @route   POST /api/auth/logout
// @access  Private
export async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Add token to blacklist
    tokenBlacklist.add(token);
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
