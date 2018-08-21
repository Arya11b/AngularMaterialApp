import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown-multiple.component.html',
  styleUrls: ['./dropdown-multiple.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  // temp for n level to be removed in latter releases
  sampleData = {
  a: ['1','2','3'],
  b: {
    h: {
      g: {
        h: ['3','6','9']
      }
    }
  }
  };
  constructor() { }

  ngOnInit() {
  }

}
