import express from 'express';
import {
  getUserInfo,
  updateUserInfo,
} from '../controllers/user';
import { userUpdateValidate } from '../middlewares/validate';

const userRouter = express.Router();

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', userUpdateValidate, updateUserInfo);

export default userRouter;