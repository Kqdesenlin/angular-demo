import { Component, OnInit } from '@angular/core';
import { OperateResult, treeNode, SelectResult, FakeNode } from '../service/operate-result';
import { HttpGetService } from '../service/http-get.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css'],
  providers: [HttpGetService]
})
export class GridListComponent implements OnInit {

  tile1 = { text: 'One', cols: 1, rows: 6, color: 'lightblue' }
  tile2 = { text: 'Two', cols: 3, rows: 3, color: 'lightgreen' }
  tile3 = { text: 'Three', cols: 3, rows: 3, color: 'lightpink' }

  isTableActive = false;

  updateTable: FakeNode[] = [];

  sqlResult: OperateResult | undefined;

  transResults: OperateResult[] | undefined;

  selectResult: SelectResult = { "columnTemplate": [], "rowTemplate": [] };


  constructor(private httpService: HttpGetService) {
  }

  ngOnInit() {
  }

  sqlexecute(newResult: OperateResult[]) {
    //存在两种情况，第一种情况，执行多个sql语句，返回多个result，则展示text-result
    //如果是只有一个result，同时，result的类型是selectok，则展示data-table
    if (1 == newResult.length && newResult[0].code == "selectOk") {
      this.isTableActive = true;
      this.selectResult = newResult[0].rtn;
      console.log(this.selectResult);
    } else {
      this.isTableActive = false;
      console.log(newResult.length);
      console.log(newResult);
      this.transResults = newResult;
    }
    this.httpService.getTableData().subscribe((data: FakeNode[]) => {
      this.updateTable = data;
    });
  }





}
