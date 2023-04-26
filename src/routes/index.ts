import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import movieRouter from './movie';
import userRouter from './user';
import NotFoundError from '../errors/NotFoundError';
import { createUser, login } from '../controllers/user';
import auth from '../middlewares/auth';
import { signupValidate, signinValidate } from '../middlewares/validate';
import Message from '../errors/ErrorMessages';

const router = express.Router();
router.use(cookieParser());

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.use(auth);
router.get('/signout', (req: Request, res: Response) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(Message.NotFoundError));
});

export default router;
