import { Router } from 'express';
import { Movie } from '../models/index.js';

const movieRouter = Router();

movieRouter.get('/all', async (req, res) => {
  const allMovies = await Movie.findAll();
  res.json(allMovies);
});

movieRouter.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await Movie.findByPk(movieId);
  res.json(movie);
});

movieRouter.post('/create', async ({body}, res) => {
  console.log(body);
  const newMovie = await Movie.create(body)

  console.log(newMovie);
  res.json({success: true, movie: newMovie})
})

export default movieRouter;