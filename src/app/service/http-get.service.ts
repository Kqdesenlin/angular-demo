import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { OperateResult } from './operate-result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable()
export class HttpGetService {
  getSqlPath = 'localhost:8080/api/sql';
  operateResult = '';
  getRtn = '';
  constructor(private http: HttpClient,
  ) {
  }

  getSql(sql: string) {
    const params = new HttpParams()
      .set('sql', sql);
    this.http.get<OperateResult>(this.getSqlPath, { params })
      .subscribe((data: OperateResult) => this.getRtn = data.info);
    console.log(this.getRtn);
  }

}
