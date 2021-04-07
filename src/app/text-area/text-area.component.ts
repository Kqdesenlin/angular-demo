import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpGetService } from '../service/http-get.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [HttpGetService]
})
export class TextAreaComponent implements OnInit {
  scansql: string;
  textFormControl = new FormControl('', [
    Validators.required
  ])
  constructor(
    private httpService: HttpGetService
  ) {
    this.scansql = "";
  }
  submit() {
    console.log(this.scansql);
    this.httpService.getSql(this.scansql);
  }

  ngOnInit() {
  }



}
