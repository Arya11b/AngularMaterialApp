import {Component, Input, OnInit} from '@angular/core';
import {FieldBase} from "../models/FieldBase";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
