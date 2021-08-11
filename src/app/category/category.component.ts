import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import {
  getCategories,
  setSelectedCategory,
  setSelectedMovies,
} from '../movies/movies.actions';
import { Category } from '../movies/movies.interfaces';
import { MovieState } from '../movies/movies.reducers';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$!: Observable<Category[]>;
  selectedCategory!: Category;
  #stream = new Subject();

  constructor(
    private dataService: DataService,
    private store: Store<{ movies: MovieState }>
  ) {
    this.categories$ = this.store.select('movies', 'allCategories');
    this.store
      .select('movies', 'selectedCategory')
      .pipe(takeUntil(this.#stream))
      .subscribe((category) => {
        this.selectedCategory = category;
      });
  }

  ngOnInit(): void {
    const categories = this.dataService.getCategories();
    this.store.dispatch(getCategories({ categories }));
    if (categories?.length) {
      this.store.dispatch(setSelectedCategory({ position: 0 }));
    }
  }

  ngOnDestroy(): void {
    this.#stream.next();
    this.#stream.complete();
  }

  showDetails(index: number) {
    this.store.dispatch(setSelectedCategory({ position: index }));
    this.store.dispatch(setSelectedMovies());
  }
}
