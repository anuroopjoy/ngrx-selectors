import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, categories } from '../app.interface';
import { CategoryState } from './category.reducers';

export const selectCategories = createFeatureSelector<AppState, CategoryState>(
  categories
);

export const categoriesSelector = createSelector(
  selectCategories,
  (state: CategoryState) => state.allCategories
);

export const currentCategorySelector = createSelector(
  selectCategories,
  (state: CategoryState) => state.selectedCategory
);
