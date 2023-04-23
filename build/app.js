"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const celebrate_1 = require("celebrate");
const logger_1 = require("./middlewares/logger");
const index_1 = require("./routes/index");
const config_1 = require("./utils/config");
const app = (0, express_1.default)();
mongoose_1.default.connect(config_1.DB_URL);
app.use(express_1.default.json());
app.use(logger_1.requestLogger);
app.use('/', index_1.router);
app.use(logger_1.errorLogger);
app.use((0, celebrate_1.errors)());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
    res.status(statusCode).send({ message });
    next();
});
app.listen(config_1.PORT);
