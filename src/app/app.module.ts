import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { moviesReducer } from './movies/movies.reducers';

@NgModule({
  declarations: [AppComponent, MoviesComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ movies: moviesReducer }, {}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
