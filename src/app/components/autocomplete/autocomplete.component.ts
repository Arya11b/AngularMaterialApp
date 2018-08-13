import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldBase} from '../../form/models/FieldBase';
import {OrmService} from "../../services/orm.service";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  constructor(private service: OrmService) { }

  ngOnInit() {
  }
  getFieldOptions(field) {
    switch (field.key) {
      case 'province':
        return field.options;
      case 'city':
        return this.service.getCitiesByProvince(this.form.value.province);
    }
  }

}
