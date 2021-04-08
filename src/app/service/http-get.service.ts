import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { OperateResult, ResultCode } from './operate-result';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  postSql(sql: string) {
    return this.http.post<OperateResult[]>(this.getSqlPath, { "sql": sql });

  }
}
