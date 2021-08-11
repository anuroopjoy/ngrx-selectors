import { createReducer, on } from '@ngrx/store';
import {
  getCategories,
  getMovies,
  setSelectedCategory,
  setSelectedMovies,
} from './movies.actions';
import { Category, Movie } from './movies.interfaces';
import { cloneDeep, groupBy } from 'lodash-es';

export interface MovieState {
  allCategories: Category[];
  allMovies: Record<string, Movie[]>;
  selectedCategory: Category;
  selectedMovies: Movie[][];
}

export const initialState: MovieState = {
  allCategories: [],
  allMovies: {},
  selectedCategory: { name: '' },
  selectedMovies: [],
};

export const moviesReducer = createReducer(
  initialState,
  on(getCategories, (state, { categories }) => ({
    ...state,
    allCategories: categories,
  })),
  on(getMovies, (state, { movies }) => ({
    ...state,
    allMovies: groupBy(movies, 'category'),
  })),
  on(setSelectedCategory, (state, { position }) => {
    const allCategories = cloneDeep(state.allCategories);
    const selectedCategory = allCategories[position];
    if (selectedCategory) {
      selectedCategory.isActive = true;
    }
    return {
      ...state,
      selectedCategory,
    };
  }),
  on(setSelectedMovies, (state) => {
    const selectedMovies = [];
    const movies = cloneDeep(state.allMovies[state.selectedCategory?.name]);
    while (movies.length) selectedMovies.push(movies.splice(0, 3));
    return {
      ...state,
      selectedMovies,
    };
  })
);
