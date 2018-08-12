import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }


  fieldHasError(key): boolean {
    if (this.form.get(key).invalid && (this.form.get(key).touched || this.form.get(key).dirty))
      return true;
    return false;
  }

  fieldErrors(key) {
    let errorMessages = [];
    let formControl = this.form.get(key);
    if (formControl.errors.required)
      errorMessages.push(key + ' is required');
    if (formControl.errors.minlength) {
      errorMessages.push(key + ' has to have more characters');
    }
    if (formControl.errors.maxlength)
      errorMessages.push(key + ' has reached maximum character');
    if (formControl.errors.pattern)
      errorMessages.push(key + ' has not valid symbols');
    return errorMessages;
  }

}
