import { createAction, props } from '@ngrx/store';

import { Category, Movie } from './movies.interfaces';

export const getCategories = createAction(
  '[Movie Component] GetCategories',
  props<{ categories: Category[] }>()
);
export const getMovies = createAction(
  '[Movie Component] GetMovies',
  props<{ movies: Movie[] }>()
);
export const setSelectedCategory = createAction(
  '[Movie Component] SetSelectedCategory',
  props<{ position: number }>()
);
export const setSelectedMovies = createAction(
  '[Movie Component] SetSelectedMovies'
);
