"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const User = (0, mongoose_1.model)('user', new mongoose_1.Schema({
    email: {
        type: String,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
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
exports.default = User;
