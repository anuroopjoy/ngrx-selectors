import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import {
  getMovies,
  setSelectedCategory,
  setSelectedMovies,
} from './movies.actions';
import { Movie } from './movies.interfaces';
import { MovieState } from './movies.reducers';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<Movie[][]>;

  constructor(
    private dataService: DataService,
    private store: Store<{ movies: MovieState }>
  ) {
    this.movies$ = this.store.select('movies', 'selectedMovies');
  }

  ngOnInit(): void {
    const movies = this.dataService.getMovies();
    this.store.dispatch(getMovies({ movies }));
    this.store.dispatch(setSelectedMovies());
  }

}
