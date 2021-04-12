import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpGetService } from '../service/http-get.service';

import { OperateResult, ResultCode } from '../service/operate-result';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [HttpGetService]
})
export class TextAreaComponent implements OnInit {
  @Output() resultChanged = new EventEmitter<OperateResult[]>();
  scansql: string;

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
  ) {
    this.scansql = "";
    this.result.info = "";
    this.result.code = "";
    this.result.rtn = "";
  }
  submit() {
    console.log("prepare to send sql : " + this.scansql);
    this.httpService.postSql(this.scansql).subscribe((data: OperateResult[]) => {
      console.log(data);
      this.resultChanged.emit(data);
      console.log("send result from child");
    });
  }

  ngOnInit() {

  }



}
