import { CategoryState } from './category/category.reducers';
import { MovieState } from './movies/movies.reducers';

export interface AppState {
  movies: MovieState;
  categories: CategoryState;
}

export const movies = 'movies';
export const categories = 'categories';