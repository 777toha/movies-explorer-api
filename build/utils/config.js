"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_URL = exports.NODE_ENV = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = (_a = process.env.JWT_TOKEN) !== null && _a !== void 0 ? _a : 'dev-token';
exports.JWT_SECRET = JWT_SECRET;
const NODE_ENV = (_b = process.env.DB_URL) !== null && _b !== void 0 ? _b : 'production';
exports.NODE_ENV = NODE_ENV;
const DB_URL = 'mongodb://localhost:27017/bitfilmsdb';
exports.DB_URL = DB_URL;
const PORT = 3000;
exports.PORT = PORT;
