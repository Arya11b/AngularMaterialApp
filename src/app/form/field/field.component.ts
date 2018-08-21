import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FieldBase} from "../models/FieldBase";
import {FormGroup} from "@angular/forms";
import {TreeFieldComponent} from "../tree-field/tree-field.component";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @ViewChild('tree') treeField: TreeFieldComponent;

  constructor() {
  }

  ngOnInit() {
  }
  getSelectedData() {
    return this.treeField.getSelectedData();
  }
}
