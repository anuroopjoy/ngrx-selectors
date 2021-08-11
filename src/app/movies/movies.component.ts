import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../app.interface';
import { DataService } from '../data.service';
import { getMovies, setSelectedMovies } from './movies.actions';
import { Movie } from './movies.interfaces';
import { moviesSelector } from './movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<Movie[][]>;

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.movies$ = this.store.select(moviesSelector);
  }

  ngOnInit(): void {
    const movies = this.dataService.getMovies();
    this.store.dispatch(getMovies({ movies }));
  }
}
