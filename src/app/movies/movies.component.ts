import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataService } from '../data.service';
import { getMovies } from './movies.actions';
import { Movie } from './movies.interfaces';
import { filteredMovieSelector } from './movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<Movie[][]>;

  constructor(private dataService: DataService, private store: Store) {
    this.movies$ = this.store.pipe(filteredMovieSelector);
  }

  ngOnInit(): void {
    const movies = this.dataService.getMovies();
    this.store.dispatch(getMovies({ movies }));
  }
}
