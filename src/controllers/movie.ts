import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Movie, { MovieDocument } from '../models/movie';

import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';
import Message from '../errors/ErrorMessages';

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
    const id = req.user?._id || '';
    const movies = await Movie.find({ owner: id });
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
  const userId = req.user?._id ?? '';
  try {
    const movieFind = await Movie.findById(req.params._id)
      .orFail(new NotFoundError(Message.NotFoundErrorMovie));
    if (movieFind.owner._id.toString() === userId) {
      const movieDelete = await Movie.findByIdAndDelete(req.params._id);
      if (!movieDelete) {
        next(new NotFoundError(Message.NotFoundErrorMovie));
      }
      res.send({ message: 'Фильм удален' });
    } else {
      next(new ForbiddenError(Message.ForbiddenErrorMovie));
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
