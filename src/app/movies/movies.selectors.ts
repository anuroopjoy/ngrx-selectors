import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, isEmpty } from 'lodash-es';

import { AppState, categories, movies } from '../app.interface';
import { CategoryState } from '../category/category.reducers';
import { Movie } from './movies.interfaces';
import { MovieState } from './movies.reducers';

export const selectMovies = createFeatureSelector<MovieState>(movies);
export const selectCategories =
  createFeatureSelector<CategoryState>(categories);

export const moviesSelector = createSelector(
  selectMovies,
  selectCategories,
  (movieStates, categories) => {
    const selectedMovies: Movie[][] = [];
    if (isEmpty(movieStates.allMovies)) {
      return selectedMovies;
    }
    const movies = cloneDeep(
      movieStates.allMovies[categories.selectedCategory?.name]
    );
    while (movies.length) selectedMovies.push(movies.splice(0, 3));
    return selectedMovies;
  }
);
