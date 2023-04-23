"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.updateUserInfo = exports.getUserInfo = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const ConflictError_1 = __importDefault(require("../errors/ConflictError"));
const UnauthorizedError_1 = __importDefault(require("../errors/UnauthorizedError"));
const config_1 = require("../utils/config");
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    try {
        const userInfo = yield user_1.default.findById(userId).select("-password");
        if (!userInfo) {
            next(new NotFoundError_1.default('Такой пользователь не найден'));
        }
        res.send(userInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserInfo = getUserInfo;
const updateUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            next(new NotFoundError_1.default('Такой пользователь не найден'));
        }
        res.send(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserInfo = updateUserInfo;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, } = req.body;
        const hash = yield bcryptjs_1.default.hash(password, 10);
        const createdUser = yield user_1.default.create({
            name,
            email,
            password: hash,
        });
        res.send({
            name: createdUser.name,
            email: createdUser.email,
        });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new BadRequestError_1.default('Некорректные данные'));
        }
        else if (error.code === 11000) {
            next(new ConflictError_1.default('Такой email уже существует'));
        }
        else {
            next(error);
        }
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email }).select('+password');
        if (!user) {
            throw new UnauthorizedError_1.default('Неправильные почта или пароль');
        }
        const data = yield bcryptjs_1.default.compare(password, user.password);
        if (!data) {
            throw new UnauthorizedError_1.default('Неправильные почта или пароль');
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.NODE_ENV === 'production' ? config_1.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.cookie('jwt', token, { httpOnly: true }).send({ message: 'Успешно' });
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
