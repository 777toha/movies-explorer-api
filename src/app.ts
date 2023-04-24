import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import { requestLogger, errorLogger, logger } from './middlewares/logger';
import router from './routes/index';
import { DB_URL, PORT } from './utils/config';
import ServerError from './errors/ServerError';
import rateLimitr from './middlewares/rateLimitr';

const app = express();

mongoose.connect(DB_URL)
  .then(() => {
    logger.info('connected');
  })
  .catch(() => {
    logger.info('faild to connect');
  });

app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimitr);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  logger.info(`started on ${PORT}`);
});
