"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieIdValidate = exports.movieValidate = exports.userUpdateValidate = exports.signinValidate = exports.signupValidate = void 0;
const celebrate_1 = require("celebrate");
const urlRegExp = /(http:\/\/|https:\/\/)(www)*[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#*/;
const signupValidate = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().required().email().messages({
            'any.require': 'Некорректный email',
        }),
        password: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректный пароль',
        }),
        name: celebrate_1.Joi.string().min(2).max(30).required().messages({
            'any.require': 'Некорректное имя пользователя',
        }),
    }),
});
exports.signupValidate = signupValidate;
const signinValidate = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().required().email().messages({
            'any.require': 'Некорректный email',
        }),
        password: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректный пароль',
        }),
    }),
});
exports.signinValidate = signinValidate;
const userUpdateValidate = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().min(2).max(30).required().messages({
            'any.require': 'Некорректное имя пользователя',
        }),
        email: celebrate_1.Joi.string().email().required().messages({
            'any.require': 'Некорректный пароль',
        }),
    }),
});
exports.userUpdateValidate = userUpdateValidate;
const movieValidate = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        country: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректная страна создания фильма',
        }),
        director: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректный режиссёр фильма',
        }),
        duration: celebrate_1.Joi.number().required().messages({
            'any.require': 'Некорректная длительность фильма',
        }),
        year: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректный год выпуска фильма',
        }),
        description: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректное описание фильма',
        }),
        image: celebrate_1.Joi.string().required().pattern(urlRegExp).messages({
            'any.require': 'Некорректная ссылка на постер к фильму',
        }),
        trailerLink: celebrate_1.Joi.string().required().pattern(urlRegExp).messages({
            'any.require': 'Некорректная ссылка на трейлер фильма',
        }),
        thumbnail: celebrate_1.Joi.string().required().pattern(urlRegExp).messages({
            'any.require': 'Некорректное миниатюрное изображение постера к фильму',
        }),
        movieId: celebrate_1.Joi.number().required().messages({
            'any.require': 'Некорректное _id пользователя, который сохранил фильм',
        }),
        nameRU: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректное название фильма на русском языке',
        }),
        nameEN: celebrate_1.Joi.string().required().messages({
            'any.require': 'Некорректное название фильма на английском языке',
        }),
    }),
});
exports.movieValidate = movieValidate;
const movieIdValidate = (0, celebrate_1.celebrate)({
    params: celebrate_1.Joi.object().keys({
        movieId: celebrate_1.Joi.string().hex().length(24),
    }),
});
exports.movieIdValidate = movieIdValidate;
