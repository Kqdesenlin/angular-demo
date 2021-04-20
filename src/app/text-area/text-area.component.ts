import { Component, OnInit, Output, EventEmitter, Inject, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpGetService } from '../service/http-get.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OperateResult, ColumnInfo, UpdateTableInfo, ColumnInfoDto } from '../service/operate-result';
import { Event } from '@angular/router';



@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [HttpGetService]
})
export class TextAreaComponent implements OnInit {
  @Output() resultChanged = new EventEmitter<OperateResult[]>();
  scansql: string;

  createTableName = new FormControl('', []);

  createTableColumn = new FormControl('', []);

  showScan = true;

  showCreateTable = false;

  showUpdateTable = false;

  scanTableName = "";

  addColumns: ColumnInfo[] = [];

  getUpdateTable: UpdateTableInfo[] = [];

  selectUpdateTable: UpdateTableInfo = {
    "name": "",
    "columns": []
  };

  parameterTypes: string[] = ['INT', 'DOUBLE', 'VARCHAR', 'CHAR'];

  selectTableName: string = "";

  public result: OperateResult = {
    "info": "",
    "code": "",
    "rtn": ""

  };

  textFormControl = new FormControl('', [
    Validators.required
  ])

  constructor(
    private httpService: HttpGetService,
    public dialog: MatDialog
  ) {
    this.scansql = "";
    this.result.info = "";
    this.result.code = "";
    this.result.rtn = "";
    this.handleGetUpdateTable();
  }
  submit() {
    console.log("prepare to send sql : " + this.scansql);
    this.scansql.replace(/[\r\n]/g, "");
    this.httpService.postSql(this.scansql).subscribe((data: OperateResult[]) => {
      console.log(data);
      this.resultChanged.emit(data);
      console.log("send result from child");
    });
  }

  sendSql(sql: string) {

    this.httpService.postSql(sql).subscribe((data: OperateResult[]) => {
      console.log(data);
      this.resultChanged.emit(data);
      this.openDialog(data[0].info);
    });
  }

  prepared() {
    this.showScan = true;
    this.showCreateTable = false;
    this.showUpdateTable = false;
  }

  createTable() {
    this.showScan = false;
    this.showCreateTable = true;
    this.showUpdateTable = false;
  }

  updateTable() {
    this.showScan = false;
    this.showCreateTable = false;
    this.showUpdateTable = true;
  }



  addColumn() {
    let column: ColumnInfo = {
      "name": "",
      "type": "",
      "parameter": "",
      "notNull": false,
      "primaryKey": false,
      "unique": false,
      "parameterDisable": true,
      "index": this.addColumns.length + 1
    };
    this.addColumns.push(column);
  }

  addUpdateColumn() {
    let column: ColumnInfoDto = {
      "columnName": "",
      "columnType": "",
      "columnArgument": 0,
      "notNull": false,
      "unique": false,
      "primaryKey": false,
      "index": this.selectUpdateTable.columns.length + 1
    }
    this.selectUpdateTable.columns.push(column);
  }
  deleteColumn(index: number) {
    console.log(index);
    for (var var1 = 0; var1 < this.addColumns.length; ++var1) {
      if (this.addColumns[var1].index == index) {
        this.addColumns.splice(var1, 1);
        break;
      }
    }
  }

  deleteUpdateColumn(index: number) {
    console.log(index);
    for (let var1 = 0; var1 < this.selectUpdateTable.columns.length; ++var1) {
      if (this.selectUpdateTable.columns[var1].index == index) {
        this.selectUpdateTable.columns.splice(var1, 1);
        break;
      }
    }
  }
  getCreateTableErrorMessage() {
    if (this.createTableName.hasError('required')) {
      return 'You must enter a table name';
    }
    return 'vaild error';
  }

  handleGetUpdateTable() {
    this.httpService.getUpdateTableData().subscribe((data: UpdateTableInfo[]) => {
      this.getUpdateTable = data;
      console.log(this.getUpdateTable);
    });
  }
  updateTableNameChange(event: any) {
    for (let var1 = 0; var1 < this.getUpdateTable.length; ++var1) {
      if (this.getUpdateTable[var1].name == event.value) {
        this.selectUpdateTable = JSON.parse(JSON.stringify(this.getUpdateTable[var1]));
        for (let var2 = 0; var2 < this.selectUpdateTable.columns.length; ++var2) {
          this.selectUpdateTable.columns[var2].index = var2 + 1;
        }
        break;
      }
    }
    console.log(this.selectUpdateTable);
  }

  addTable() {
    let createSql: string = "CREATE TABLE ";
    createSql = createSql.concat(this.scanTableName);
    createSql = createSql.concat("(");
    for (let v = 0; v < this.addColumns.length; ++v) {
      let column = this.addColumns[v];
      let tempSql = column.name + " " + column.type;
      //添加类型
      if (column.type == 'VARCHAR' || column.type == 'CHAR') {
        if (column.parameter != null) {
          tempSql = tempSql.concat("(" + column.parameter + ") ");
        } else {
          tempSql = tempSql.concat("(" + "10" + ") ");
        }
      } else {
        tempSql = tempSql + " ";
      }
      //添加特殊类型
      if (true == column.notNull) {
        tempSql = tempSql.concat("not null ");
      }
      if (true == column.unique) {
        tempSql = tempSql.concat("unique ");
      }
      if (v != (this.addColumns.length - 1)) {
        tempSql = tempSql.concat(",");
      }
      createSql = createSql.concat(tempSql);
    }
    createSql = createSql.concat(");");
    this.sendSql(createSql);
  }

  setTable() {
    let updateSql = "alter table " + this.selectTableName;
    let oldUpdateTableColumn: ColumnInfoDto[] = [];
    for (let var1 = 0; var1 < this.getUpdateTable.length; ++var1) {
      if (this.getUpdateTable[var1].name == this.selectTableName) {
        oldUpdateTableColumn = JSON.parse(JSON.stringify(this.getUpdateTable[var1].columns));
      }
    }
    console.log(oldUpdateTableColumn);
    //先删
    for (let var1 = 0; var1 < oldUpdateTableColumn.length; ++var1) {
      let var2 = 0;
      for (; var2 < this.selectUpdateTable.columns.length; ++var2) {
        if (oldUpdateTableColumn[var1].columnName == this.selectUpdateTable.columns[var2].columnName) {
          break;
        }
      }

      if (var2 == this.selectUpdateTable.columns.length) {
        let tempDropSql: string = "drop column " + oldUpdateTableColumn[var1].columnName + " ,";
        updateSql = updateSql.concat(tempDropSql);
      }

    }
    //再修改

    for (let var3 = 0; var3 < oldUpdateTableColumn.length; ++var3) {
      let var4 = 0;
      for (; var4 < this.selectUpdateTable.columns.length; ++var4) {
        if (oldUpdateTableColumn[3].columnName == this.selectUpdateTable.columns[var4].columnName) {
          let tempAlterSql: string = "alter column " + this.selectUpdateTable.columns[var4].columnName;
          let type = this.selectUpdateTable.columns[var4].columnType;
          let parameter = this.selectUpdateTable.columns[var4].columnArgument;
          tempAlterSql = tempAlterSql + " " + type;
          //添加类型
          if (type == 'VARCHAR' || type == 'CHAR') {
            if (parameter != null) {
              tempAlterSql = tempAlterSql.concat("(" + parameter + ") ");
            } else {
              tempAlterSql = tempAlterSql.concat("(" + "10" + ") ");
            }
          } else {
            tempAlterSql = tempAlterSql + " ";
          }

          //添加特殊类型
          if (true == this.selectUpdateTable.columns[var4].notNull) {
            tempAlterSql = tempAlterSql.concat("not null ");
          }
          if (true == this.selectUpdateTable.columns[var4].unique) {
            tempAlterSql = tempAlterSql.concat("unique ");
          }
          tempAlterSql = tempAlterSql.concat(",");
          updateSql = updateSql.concat(tempAlterSql);
        }
      }
    }
    //最后添加
    for (let var5 = 0; var5 < oldUpdateTableColumn.length; ++var5) {
      let var6 = 0;
      for (; var6 < this.selectUpdateTable.columns.length; ++var6) {
        if
      }
    }
  }
  openDialog(input: string): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      data: input
    });
  }
  addIndex() {

  }

  ngOnInit() {

  }



}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverviewDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
