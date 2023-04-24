import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Movie, { MovieDocument } from '../models/movie';

import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

interface MovieData {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (
  req: Request<ParamsDictionary, MovieDocument, MovieData>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?._id ?? '';
    const postMovie = await Movie.create({
      ...req.body,
      owner: id,
    });
    res.send(postMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.movieId;
    const userId = req.user?._id ?? '';
    if (userId === id) {
      const movie = await Movie.findByIdAndDelete(id);
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
      }
      res.send({ message: 'Фильм удален' });
    } else {
      next(new ForbiddenError('У вас недотостаточно прав для удаления фильма'));
    }
  } catch (err) {
    next(err);
  }
};

export {
  getMovieById,
  createMovie,
  deleteMovie,
};
