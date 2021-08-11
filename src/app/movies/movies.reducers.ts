import { createReducer, on } from '@ngrx/store';
import { getMovies } from './movies.actions';
import { Movie } from './movies.interfaces';
import { groupBy } from 'lodash-es';

export interface MovieState {
  allMovies: Record<string, Movie[]>;
}

export const initialState: MovieState = {
  allMovies: {},
};

export const moviesReducer = createReducer(
  initialState,
  on(getMovies, (state, { movies }) => ({
    ...state,
    allMovies: groupBy(movies, 'category'),
  }))
);
