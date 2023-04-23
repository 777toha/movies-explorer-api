"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validate_1 = require("../middlewares/validate");
const userRouter = express_1.default.Router();
userRouter.get('/me', user_1.getUserInfo);
userRouter.patch('/me', validate_1.userUpdateValidate, user_1.updateUserInfo);
exports.default = userRouter;
