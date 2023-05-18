import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import { User, UserDocument } from '../models/user';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import UnauthorizedError from '../errors/UnauthorizedError';
import Message from '../errors/ErrorMessages';
import { NODE_ENV, JWT_SECRET } from '../utils/config';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id ?? '';
  try {
    const userInfo = await User.findById(userId).select('-password');
    if (!userInfo) {
      next(new NotFoundError(Message.NotFoundErrorUser));
    }
    res.send(userInfo);
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id ?? '';
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true },
    ).select('-password');
    if (!updatedUser) {
      next(new NotFoundError(Message.NotFoundErrorUser));
    }
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(Message.BadRequestError));
    } else if (error as MongoError) {
      next(new ConflictError(Message.ConflictError));
    } else {
      next(error);
    }
  }
};

const createUser = async (
  req: Request<ParamsDictionary, UserDocument, UserRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

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
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(Message.BadRequestError));
    } else if (error as MongoError) {
      next(new ConflictError(Message.ConflictError));
    } else {
      next(error);
    }
  }
};

const login = async (
  req: Request<ParamsDictionary, UserDocument, UserRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError(Message.UnauthorizedLogin);
    }

    const data = await bcrypt.compare(password, user.password);
    if (!data) {
      throw new UnauthorizedError(Message.UnauthorizedLogin);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, { httpOnly: true, sameSite: 'none' }).send({ message: 'Успешно' });
  } catch (e) {
    next(e);
  }
};

export {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
