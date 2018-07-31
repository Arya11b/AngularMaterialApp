import { Injectable } from '@angular/core';
import {FieldBase} from './form/models/FieldBase';
import {FieldTextBox} from './form/models/FieldTextBox';
import {Validators} from '@angular/forms';

@Injectable()
export class FieldService {
    // remove required
    public fields: FieldBase<any>[] = [
      new FieldTextBox({
        key: 'firstName',
        label: 'First name',
        value: '',
        placeHolder: 'ex: han',
        icon: 'form-1',
        order: 1,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Za-z]*')
        ]
      }),
      new FieldTextBox({
        key: 'lastName',
        label: 'Last name',
        value: '',
        placeHolder: 'ex: solo',
        icon: 'form-2',
        order: 2,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Za-z]*')
        ]
      }),
      new FieldTextBox({
        key: 'alias',
        label: 'Alias',
        value: '',
        placeHolder: 'ex: ishotfirst',
        icon: 'form-3',
        order: 3,
        validators: [
          Validators.required,
          Validators.pattern('[A-Za-z0-9]*')
        ]
      })

    ];

}
