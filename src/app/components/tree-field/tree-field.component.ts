import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";

@Component({
  selector: 'app-tree-field',
  templateUrl: './tree-field.component.html',
  styleUrls: ['./tree-field.component.scss']
})
export class TreeFieldComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
