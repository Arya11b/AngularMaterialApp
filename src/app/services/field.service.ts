import { Injectable } from '@angular/core';
import {FieldBase} from '../form/models/FieldBase';
import {FieldTextBox} from '../form/models/FieldTextBox';
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
        icon: 'form-2',
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
        icon: 'form-1',
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
    public phoneFields: FieldBase<any>[] = [
      new FieldTextBox({
        key: 'phoneCode',
        label: 'Code',
        value: '',
        placeHolder: 'ex: 463',
        icon: 'form-4',
        order: 1,
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(3),
          Validators.pattern('[0-9]*')
        ]
      }),
      new FieldTextBox({
        key: 'phoneNumber',
        label: 'Number',
        value: '',
        placeHolder: 'ex: 9338945',
        icon: 'form-4',
        order: 2,
        validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('[0-9]*')
        ]
      }),
      new FieldTextBox({
        key: 'phonePlace',
        label: 'Place',
        value: '',
        placeHolder: 'ex: Work',
        icon: 'form-4',
        order: 3,
        validators: [
          Validators.required,
          Validators.pattern('[A-Za-z]*')
        ]
      }),

    ];
  public addressFields: FieldBase<any>[] = [
    new FieldTextBox({
      key: 'addressPlace',
      label: 'Place',
      value: '',
      placeHolder: 'ex: Home',
      icon: 'form-4',
      order: 1,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(9),
        Validators.pattern('[A-Za-z]*')
      ]
    }),
    new FieldTextBox({
      key: 'addressLoc',
      label: 'Location',
      value: '',
      placeHolder: 'ex: Gurrero Street',
      icon: 'form-4',
      order: 2,
      validators: [
        Validators.required,
      ]
    }),

  ];
}
