import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import todoRoutes from './routes/todoRoutes.js';    
import { swaggerDocs } from './swagger.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/products', productRoutes);
app.use('/api/todos', todoRoutes);

// Swagger documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
