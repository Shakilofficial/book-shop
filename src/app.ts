import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { productRoute } from './app/modules/product/product.route';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes Setup
app.use('/api/products', productRoute);
// app.use('/api/orders', ordersRoutes);

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    message: 'Server is live 🚀',
  });
});

// Fallback route
app.all('*', (req: Request, res: Response) => {
  res.status(404).send({
    status: false,
    message: '❌ Route not found ⚠️',
  });
});

export default app;
