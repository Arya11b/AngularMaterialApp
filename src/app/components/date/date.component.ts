import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})

export class DateComponent {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
}
