import { Component, OnInit } from '@angular/core';
import { OperateResult } from '../service/operate-result';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {

  tile1 = { text: 'One', cols: 1, rows: 3, color: 'lightblue' }
  tile2 = { text: 'Two', cols: 3, rows: 1, color: 'lightgreen' }
  tile3 = { text: 'Three', cols: 3, rows: 2, color: 'lightpink' }

  isTableActive = false;

  sqlResult: OperateResult | undefined;

  transResults: OperateResult[] | undefined;
  constructor() {

  }

  ngOnInit() {

  }

  sqlexecute(newResult: OperateResult[]) {
    console.log(newResult);
    this.transResults = newResult;
  }

}
