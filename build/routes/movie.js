"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../controllers/movie");
const validate_1 = require("../middlewares/validate");
const movieRouter = express_1.default.Router();
movieRouter.get('/', movie_1.getMovieById);
movieRouter.post('/', validate_1.movieValidate, movie_1.createMovie);
movieRouter.delete('/:movieId', validate_1.movieIdValidate, movie_1.deleteMovie);
exports.default = movieRouter;
