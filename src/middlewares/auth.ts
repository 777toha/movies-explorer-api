import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NODE_ENV, JWT_SECRET } from '../utils/config';
import UnauthorizedError from '../errors/UnauthorizedError';

interface Payload {
  _id: string;
  name: string;
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies.jwt) {
    const token: string = req.cookies.jwt;
    let payload: object;


    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      req.user = payload;
      next();
    } catch (e) {
      next(new UnauthorizedError('Необходима авторизация'));
    }

  } else {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export {
  auth,
};
