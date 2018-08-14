import {Injectable} from '@angular/core';
import {FieldBase} from '../form/models/FieldBase';
import {FieldTextBox} from '../form/models/FieldTextBox';
import {Validators} from '@angular/forms';
import {LanguageService} from "./language.service";
import {lang} from "../../resources/lang";
import {FieldDate} from "../form/models/FieldDate";
import {FieldDropdown} from "../form/models/FieldDropdown";
import {OrmService} from "./orm.service";
import {FieldAutoComplete} from "../form/models/FieldAutoComplete";
import {catchError} from "rxjs/internal/operators";
@Injectable()
export class FieldService {
  constructor(private languageService: LanguageService, private ormService: OrmService) {
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
    }),
    new FieldDropdown({
      key: 'superpower',
      label: 'SuperPower', // to be bilingual
      value: '',
      placeHolder: 'select your power', // to be bilingual
      icon: 'form-3',
      options: this.getSuperPowerOptions(),
      // options: [{key: 'ss',value:'bb'}] + this.getSuperPowerCategories(),
      order: 3,
      validators: [
        Validators.required,
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
  public todoFields: FieldBase<any>[] = [
    new FieldTextBox({
      key: 'note',
      label: 'ToDo',
      value: '',
      placeHolder: 'ex: save the world',
      icon: '',
      order: 1,
      validators: [
        Validators.required,
      ]
    }),
    new FieldDate({
      key: 'due',
      label: 'Due date',
      type: 'date',
      value: '',
      placeHolder: 'pick a date',
      order: 2,
      validators: [
        Validators.required,
      ]
    }),

  ];
  public cityFields: FieldBase<any>[] = [
    new FieldAutoComplete({
      key: 'province',
      label: 'Province',
      value: '',
      placeHolder: 'choose a province',
      icon: '',
      options: this.getProvinces(),
      order: 1,
      validators: [
        Validators.required,
      ]
    }),
    new FieldAutoComplete({
      key: 'city',
      label: 'City',
      value: '',
      placeHolder: 'choose a city',
      options: this.getCities(),
      order: 2,
      validators: [
        Validators.required,
      ]
    }),

  ];

  get fieldsText() {
    return lang[this.languageService.getLang()].fields;
  }

  getSuperPowerOptions() {
    let opt: { category: string, subCat: any[] }[] = [];
    this.ormService.getSuperPowerCategories().forEach(category => {
      opt.push({category: category, subCat: this.ormService.getSuperPowerByCategory(category)});
    });
    console.log(opt);
    return opt;
  }

  getProvinces() {
    return this.ormService.getProvinces();
  }

  getCities() {
    return this.ormService.getAllCities();
  }
}


