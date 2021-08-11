import { createAction, props } from '@ngrx/store';
import { Category } from './category.interfaces';

export const getCategories = createAction(
  '[Category Component] GetCategories',
  props<{ categories: Category[] }>()
);
export const setSelectedCategory = createAction(
  '[Category Component] SetSelectedCategory',
  props<{ position: number }>()
);
