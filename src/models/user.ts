import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

interface ModelUser {
  email: string;
  password: string;
  name: string;
}

const User = model('user', new Schema<ModelUser>({
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}));

export type UserDocument = mongoose.HydratedDocument<ModelUser>;

export {
  User,
};
