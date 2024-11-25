import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/Bicyle/bicyle.route';
import { orderRoutes } from './app/modules/Order/order.route';
const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());


// Routes for products
app.use('/api/products',productRoutes);

// Routes for order 
app.use('/api/orders',orderRoutes);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
