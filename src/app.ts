import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/Bicyle/bicyle.route';
const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());


// Routes 
app.use('/api/v1/product',productRoutes);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
