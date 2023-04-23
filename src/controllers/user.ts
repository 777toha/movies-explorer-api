import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/user';
import { ParamsDictionary } from 'express-serve-static-core';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { NODE_ENV, JWT_SECRET } from '../utils/config';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!._id;
  try {
    const userInfo = await User.findById(userId).select("-password");
    if (!userInfo) {
      next(new NotFoundError('Такой пользователь не найден'));
    }
    res.send(userInfo);
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      next(new NotFoundError('Такой пользователь не найден'));
    }
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request<ParamsDictionary, UserDocument, UserRequest>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
    } = req.body

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    res.send({
      name: createdUser.name,
      email: createdUser.email,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные'));
    } else if (error.code === 11000) {
      next(new ConflictError('Такой email уже существует'));
    } else {
      next(error);
    }
  }
}

const login = async (req: Request<ParamsDictionary, UserDocument, UserRequest>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const data = await bcrypt.compare(password, user.password);
    if (!data) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, { httpOnly: true }).send({ message: 'Успешно' });

  } catch (e) {
    next(e);
  }
}

export {
  getUserInfo,
  updateUserInfo,
  createUser,
  login
};
