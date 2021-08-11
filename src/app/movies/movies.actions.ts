import { createAction, props } from '@ngrx/store';

import { Movie } from './movies.interfaces';

export const getMovies = createAction(
  '[Movie Component] GetMovies',
  props<{ movies: Movie[] }>()
);
export const setSelectedMovies = createAction(
  '[Movie Component] SetSelectedMovies'
);
