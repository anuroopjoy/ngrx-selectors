import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../app.interface';
import { DataService } from '../data.service';
import { categoriesSelector, currentCategorySelector } from './categories.selectors';
import { getCategories, setSelectedCategory } from './category.actions';
import { Category } from './category.interfaces';

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
    private store: Store<AppState>
  ) {
    this.categories$ = this.store.select(categoriesSelector);
    this.store
      .select(currentCategorySelector)
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
  }
}
