import express from 'express';
import {
user
} from '../controllers/user';
// import {

// } from '../middlewares/validate';

const userRouter = express.Router();

userRouter.get('/users/me', auth, user);
userRouter.patch('/users/me', auth, user);

export default userRouter;