import express from 'express';
import cors from 'cors';
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

// const corsOptions = {
//   origin: ['http://localhost:3000',
//     'http://127.0.0.1:3000',
//     'https://best-movie.nomoredomains.monster',
//     'http://best-movie.nomoredomains.monster',
//   ],
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// const allowedCors = ['http://localhost:3000',
//   'http://127.0.0.1:3000',
//   'https://best-movie.nomoredomains.monster',
//   'http://best-movie.nomoredomains.monster',
//   'https://api.best-movie.nomoredomains.monster',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;

//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (typeof origin === 'string' && allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }
//   if (req.method === 'OPTIONS') {
//     const headers = {
//       'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
//       'Access-Control-Allow-Headers': requestHeaders,
//     };
//     res.writeHead(200, headers);
//     res.end();
//     return;
//   }

//   next();
// });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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
