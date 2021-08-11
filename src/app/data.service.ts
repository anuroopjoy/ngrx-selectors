import { Injectable } from '@angular/core';
import { Category } from './category/category.interfaces';
import { movieList } from './movies/movies.constants';
import { Movie } from './movies/movies.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getCategories(): Category[] {
    return [
      { name: 'Action' },
      { name: 'Animation' },
      { name: 'Comedy' },
      { name: 'Horror' },
    ];
  }

  getMovies(): Movie[] {
    return movieList;
  }
}
