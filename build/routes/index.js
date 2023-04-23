"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const movie_1 = __importDefault(require("./movie"));
const user_1 = __importDefault(require("./user"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_2 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
exports.router = router;
router.use((0, cookie_parser_1.default)());
router.post('/signup', validate_1.signupValidate, user_2.createUser);
router.post('/signin', validate_1.signinValidate, user_2.login);
router.get('/signout', (req, res) => {
    res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use(auth_1.auth);
router.use('/users', user_1.default);
router.use('/movies', movie_1.default);
router.use('*', (req, res, next) => {
    next(new NotFoundError_1.default('Страница не найдена'));
});
