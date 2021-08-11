import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import {
  getCategories,
  getMovies,
  setSelectedCategory,
  setSelectedMovies,
} from './movies.actions';
import { Category, Movie } from './movies.interfaces';
import { MovieState } from './movies.reducers';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  categories$!: Observable<Category[]>;
  movies$!: Observable<Movie[][]>;
  selectedCategory!: Category;
  #stream = new Subject();

  constructor(
    private dataService: DataService,
    private store: Store<{ movies: MovieState }>
  ) {
    this.categories$ = this.store.select('movies', 'allCategories');
    this.movies$ = this.store.select('movies', 'selectedMovies');
    this.store
      .select('movies', 'selectedCategory')
      .pipe(takeUntil(this.#stream))
      .subscribe((category) => {
        this.selectedCategory = category;
      });
  }
  ngOnDestroy(): void {
    this.#stream.next();
    this.#stream.complete();
  }

  ngOnInit(): void {
    const categories = this.dataService.getCategories();
    this.store.dispatch(getCategories({ categories }));
    const movies = this.dataService.getMovies();
    this.store.dispatch(getMovies({ movies }));
    if (categories?.length) {
      this.store.dispatch(setSelectedCategory({ position: 0 }));
      this.store.dispatch(setSelectedMovies());
    }
  }

  showDetails(index: number) {
    this.store.dispatch(setSelectedCategory({ position: index }));
    this.store.dispatch(setSelectedMovies());
  }
}
