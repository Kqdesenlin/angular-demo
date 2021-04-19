import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { OperateResult, FakeNode, UpdateTableInfo } from './operate-result';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable()
export class HttpGetService {
  getSqlPath = 'http://localhost:8080/api/sql';
  operateResult = '';
  getRtn = '';
  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  constructor(private http: HttpClient,
  ) {
  }

  getSql(sql: string) {
    const params = new HttpParams()
      .set("sql", sql);

    let temp: OperateResult;
    this.http.post<OperateResult>(this.getSqlPath, { "sql": sql })
      .subscribe((data: OperateResult) => {
        temp.info = data.info;
        temp.rtn = data.rtn;
        temp.code = data.code;
      });
  }

  getTableData() {
    return this.http.get<FakeNode[]>("http://localhost:8080/api/data");
  }
  postSql(sql: string) {
    return this.http.post<OperateResult[]>(this.getSqlPath, { "sql": sql });
  }
  getUpdateTableData() {
    return this.http.get<UpdateTableInfo[]>("http://localhost:8080/api/updatedata");
  }
}
