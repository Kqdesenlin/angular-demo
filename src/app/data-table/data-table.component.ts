import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SelectResult } from '../service/operate-result';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() results: SelectResult = { "columnTemplate": [], "rowTemplate": [] };

  totalData = [];
  beginIndex = 0;
  endIndex = 5;
  dataLength = 5;
  dataSource = [];
  displayedColumns: string[] = [];




  constructor() { }

  ngOnInit() {


  }

  ngOnChanges() {
    console.log(this.results);
    this.totalData = this.results.rowTemplate;
    this.dataLength = this.totalData.length;
    this.dataSource = this.totalData.slice(this.beginIndex, this.endIndex);
    this.displayedColumns = this.results.columnTemplate;
    this.fillDataTo5Muti();
  }

  changeData(index: number) {
    this.dataSource = this.totalData.slice(this.beginIndex + 5 * index, this.endIndex + 5 * index);
    this.fillDataTo5Muti();
  }
  fillDataTo5Muti() {
    let obj: any = {};

    if (this.totalData.length != 0) {
      let array = this.totalData[0];
      var x;
      for (x in array) {
        obj[x] = '';
      }
    } else {
      for (let var1 of this.displayedColumns) {
        obj[var1] = '';
      }
      console.log(obj);
    }
    if (this.dataSource.length % 5 != 0 || this.dataSource.length == 0) {

      this.dataSource = this.dataSource.concat(obj);

      this.fillDataTo5Muti();
    }
  }

  setPageData(event: PageEvent): PageEvent {
    this.changeData(event.pageIndex);
    return event;
  }


}
