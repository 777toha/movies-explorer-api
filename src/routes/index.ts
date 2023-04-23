import express, { Request, Response, NextFunction } from 'express';
import movieRouter from './movie';
import userRouter from './user';
import NotFoundError from '../errors/NotFoundError';
import cookieParser from 'cookie-parser';
import { createUser, login } from '../controllers/user';
import { auth } from '../middlewares/auth';
import { signupValidate, signinValidate } from '../middlewares/validate';

const router = express.Router();
router.use(cookieParser());

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.get('/signout', (req: Request, res: Response) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});

export {
  router,
};