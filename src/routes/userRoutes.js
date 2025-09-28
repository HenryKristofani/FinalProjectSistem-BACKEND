import { Router } from 'express';
import { getUsers} from '../controllers/userController.js';

const router = Router();

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', getUsers);

export default router;
