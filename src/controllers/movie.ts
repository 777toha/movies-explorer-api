import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Movie, { MovieDocument } from '../models/movie';

import NotFoundError from '../errors/NotFoundError';

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

interface DeleteMovieParams {
  movieId: string
}

const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req: Request<ParamsDictionary, MovieDocument, MovieData>, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!
    const createMovie = await Movie.create({
      ...req.body,
      owner: _id
    });
    res.send(createMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req: Request<DeleteMovieParams>, res: Response, next: NextFunction) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId);
    if (!movie) {
      next(new NotFoundError('Фильм не найден'));
    }
    res.send({ message: 'Фильм удален' });
  } catch (err) {
    next(err);
  }
};

export {
  getMovieById,
  createMovie,
  deleteMovie
}