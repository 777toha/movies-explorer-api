import express from 'express';
import {
  getMovieById,
  createMovie,
  deleteMovie,
} from '../controllers/movie';
import { movieValidate, movieIdValidate } from '../middlewares/validate';

const movieRouter = express.Router();

movieRouter.get('/', getMovieById);
movieRouter.post('/', movieValidate, createMovie);
movieRouter.delete('/:movieId', movieIdValidate, deleteMovie);

export default movieRouter;