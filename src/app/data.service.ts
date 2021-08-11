import { Injectable } from '@angular/core';
import { movieList } from './movies/movies.constants';
import { Category, Movie } from './movies/movies.interfaces';

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
