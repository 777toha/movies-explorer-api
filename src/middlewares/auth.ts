import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';

const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies.jwt) {
    const token: string = req.cookies.jwt;
    let payload: any;


    try {
      payload = jwt.verify(token, `${process.env.NODE_ENV}` === 'production' ? `${process.env.JWT_SECRET}` : 'dev-secret');
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
  auth
}
