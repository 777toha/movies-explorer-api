"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
const auth = (req, res, next) => {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(token, `${process.env.NODE_ENV}` === 'production' ? `${process.env.JWT_SECRET}` : 'dev-secret');
            req.user = payload;
            next();
        }
        catch (e) {
            next(new UnauthorizedError_1.default('Необходима авторизация'));
        }
    }
    else {
        next(new UnauthorizedError_1.default('Необходима авторизация'));
    }
};
exports.auth = auth;
