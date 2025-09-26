import { Router } from 'express';
import { getTodos } from '../controllers/todoController.js';

const router = Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get('/', getTodos);

export default router;