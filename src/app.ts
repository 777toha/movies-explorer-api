import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import { router } from './routes/index';
import { DB_URL, PORT } from './utils/config';

const app = express();

mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('faild to connect');
  });


app.use(express.json());
app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`started on ${PORT}`);
});