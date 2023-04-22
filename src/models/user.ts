import { Schema, model } from 'mongoose';
import validator from 'validator';

interface User {
  email: string;
  password: string;
  name: string;
}

const User = model('user', new Schema<User>({
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email',
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
}));

export default User;
