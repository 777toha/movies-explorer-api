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
exports.deleteMovie = exports.createMovie = exports.getMovieById = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const getMovieById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_1.default.find({});
        res.send(movies);
    }
    catch (err) {
        next(err);
    }
});
exports.getMovieById = getMovieById;
const createMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieData = {
            country: req.body.country,
            director: req.body.director,
            duration: req.body.duration,
            year: req.body.year,
            description: req.body.description,
            image: req.body.image,
            trailerLink: req.body.trailerLink,
            nameRU: req.body.nameRU,
            nameEN: req.body.nameEN,
            thumbnail: req.body.thumbnail,
            movieId: req.body.movieId
        };
        const { _id } = req.user;
        const createMovie = yield movie_1.default.create(Object.assign(Object.assign({}, movieData), { owner: _id }));
        res.send(createMovie);
    }
    catch (err) {
        next(err);
    }
});
exports.createMovie = createMovie;
const deleteMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movie_1.default.findByIdAndDelete(req.params.movieId);
        if (!movie) {
            next(new NotFoundError_1.default('Фильм не найден'));
        }
        res.send({ message: 'Фильм удален' });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteMovie = deleteMovie;
