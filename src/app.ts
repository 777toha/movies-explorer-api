import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';

dotenv.config();

const app = express();

const { PORT = 3000 } = process.env;

app.use('/', userRouter);
app.use('/', movieRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Hello, TS')
});