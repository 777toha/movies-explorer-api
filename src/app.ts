import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import { requestLogger, errorLogger, logger } from './middlewares/logger';
import router from './routes/index';
import { DB_URL, PORT } from './utils/config';
import rateLimitr from './middlewares/rateLimitr';
import AllErrors from './errors/AllErrors';

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

app.use(AllErrors);

app.listen(PORT, () => {
  logger.info(`started on ${PORT}`);
});
