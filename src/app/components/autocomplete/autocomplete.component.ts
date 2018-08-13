import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldBase} from '../../form/models/FieldBase';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
