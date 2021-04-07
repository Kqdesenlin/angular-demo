import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SideTreeComponent } from './side-tree/side-tree.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { TextAreaComponent } from './text-area/text-area.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    SideTreeComponent,
    HeroesListComponent,
    PageNotFoundComponent,
    GridListComponent,
    TextAreaComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    ScrollingModule,
    FormsModule,
    CdkTreeModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatTableModule,
    HttpClientModule,
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
