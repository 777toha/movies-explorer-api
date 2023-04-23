import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_TOKEN ?? 'dev-token';
const NODE_ENV = process.env.NODE_ENV ?? 'production';
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = 3000;

export {
  JWT_SECRET,
  NODE_ENV,
  DB_URL,
  PORT,
};