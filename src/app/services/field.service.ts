import { Injectable } from '@angular/core';
import {FieldBase} from '../form/models/FieldBase';
import {FieldTextBox} from '../form/models/FieldTextBox';
import {Validators} from '@angular/forms';
import {LanguageService} from "./language.service";
import {lang} from "../../resources/lang";

@Injectable()
export class FieldService {
  constructor(private languageService: LanguageService) {
  }
    public fields: FieldBase<any>[] = [
      new FieldTextBox({
        key: 'firstName',
        label: this.fieldsText.firstName.label,
        value: '',
        placeHolder: this.fieldsText.firstName.placeHolder,
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
        label: this.fieldsText.lastName.label,
        value: '',
        placeHolder: this.fieldsText.lastName.placeHolder,
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
        label: this.fieldsText.alias.label,
        value: '',
        placeHolder: this.fieldsText.alias.placeHolder,
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
        label: this.fieldsText.phoneCode.label,
        value: '',
        placeHolder: this.fieldsText.phoneCode.placeHolder,
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
        label: this.fieldsText.phoneNumber.label,
        value: '',
        placeHolder: this.fieldsText.phoneNumber.placeHolder,
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
        label: this.fieldsText.phonePlace.label,
        value: '',
        placeHolder: this.fieldsText.phonePlace.placeHolder,
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
      label: this.fieldsText.addressPlace.label,
      value: '',
      placeHolder: this.fieldsText.addressPlace.placeHolder,
      icon: 'form-5',
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
      label: this.fieldsText.addressLoc.label,
      value: '',
      placeHolder: this.fieldsText.addressLoc.placeHolder,
      icon: 'form-5',
      order: 2,
      validators: [
        Validators.required,
      ]
    }),

  ];
  get fieldsText() {
    return lang[this.languageService.getLang()].fields;
  }
}
