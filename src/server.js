import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerDocs } from './swagger.js';
import productRoutes from './routes/productRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';    
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/products', productRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);

// Swagger documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
