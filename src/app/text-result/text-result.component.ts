import { Component, Input, OnInit } from '@angular/core';
import { OperateResult } from '../service/operate-result';

@Component({
  selector: 'app-text-result',
  templateUrl: './text-result.component.html',
  styleUrls: ['./text-result.component.css']
})
export class TextResultComponent implements OnInit {

  @Input() results: OperateResult[] | undefined;

  constructor() { }

  ngOnInit() {
  }

}
