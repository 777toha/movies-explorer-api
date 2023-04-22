import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import UnauthorizedError from '../errors/UnauthorizedError';


const {NODE_ENV, JWT_SECRET } = process.env

const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.user._id;
  try {
    const userInfo = await User.findById(userId).select("-password");
    if (!userInfo) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default {
  getUserInfo,
  updateUserInfo
};
