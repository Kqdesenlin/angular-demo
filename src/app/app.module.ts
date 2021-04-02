import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SideTreeComponent } from './side-tree/side-tree.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GridListComponent } from './grid-list/grid-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    AppComponent,
    SideTreeComponent,
    HeroesListComponent,
    PageNotFoundComponent,
    GridListComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    ScrollingModule,
    RouterModule.forRoot([
      { path: 'side-tree', component: SideTreeComponent },
      { path: 'heroes-list', component: HeroesListComponent },
      { path: '', redirectTo: '/heroes-list', pathMatch: 'full' },
      { path: 'grid-list', component: GridListComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
    BrowserAnimationsModule,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
