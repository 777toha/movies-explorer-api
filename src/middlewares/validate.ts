import { Joi, celebrate } from 'celebrate';

const urlRegExp = /(http:\/\/|https:\/\/)(www)*[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#*/;

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': 'Некорректный email',
    }),
    password: Joi.string().required().messages({
      'any.require': 'Некорректный пароль',
    }),
    name: Joi.string().min(2).max(30).required().messages({
      'any.require': 'Некорректное имя пользователя',
    }),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.require': 'Некорректный email',
    }),
    password: Joi.string().required().messages({
      'any.require': 'Некорректный пароль',
    }),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'any.require': 'Некорректное имя пользователя',
    }),
    email: Joi.string().email().required().messages({
      'any.require': 'Некорректный пароль',
    }),
  }),
});

const movieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.require': 'Некорректная страна создания фильма',
    }),
    director: Joi.string().required().messages({
      'any.require': 'Некорректный режиссёр фильма',
    }),
    duration: Joi.number().required().messages({
      'any.require': 'Некорректная длительность фильма',
    }),
    year: Joi.string().required().messages({
      'any.require': 'Некорректный год выпуска фильма',
    }),
    description: Joi.string().required().messages({
      'any.require': 'Некорректное описание фильма',
    }),
    image: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Некорректная ссылка на постер к фильму',
    }),
    trailerLink: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Некорректная ссылка на трейлер фильма',
    }),
    thumbnail: Joi.string().required().pattern(urlRegExp).messages({
      'any.require': 'Некорректное миниатюрное изображение постера к фильму',
    }),
    movieId: Joi.number().required().messages({
      'any.require': 'Некорректное _id пользователя, который сохранил фильм',
    }),
    nameRU: Joi.string().required().messages({
      'any.require': 'Некорректное название фильма на русском языке',
    }),
    nameEN: Joi.string().required().messages({
      'any.require': 'Некорректное название фильма на английском языке',
    }),
  }),
});

const movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

export {
  signupValidate,
  signinValidate,
  userUpdateValidate,
  movieValidate,
  movieIdValidate,
};
