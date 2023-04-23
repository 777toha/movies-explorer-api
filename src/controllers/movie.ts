import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie';

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

const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieData: MovieData = {
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
    const { _id } = req.user!
    const createMovie = await Movie.create({
      ...movieData,
      owner: _id
    });
    res.send(createMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
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