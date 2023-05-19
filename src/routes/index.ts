import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import movieRouter from './movie';
import userRouter from './user';
import NotFoundError from '../errors/NotFoundError';
import { createUser, login, logout } from '../controllers/user';
import auth from '../middlewares/auth';
import { signupValidate, signinValidate } from '../middlewares/validate';
import Message from '../errors/ErrorMessages';
import cookieRouter from './cookie';

const router = express.Router();
router.use(cookieParser());

router.use(cookieRouter);
router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.use(auth);
router.post('/signout', logout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(Message.NotFoundError));
});

export default router;
