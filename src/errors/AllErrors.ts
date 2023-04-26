import { Request, Response, NextFunction } from 'express';
import ServerError from './ServerError';
import Message from './ErrorMessages';

const AllErrors = ((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? Message.ServerError : err.message;
  res.status(statusCode).send({ message });
  next();
});

export default AllErrors;
