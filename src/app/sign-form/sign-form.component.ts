import {Component, OnInit} from '@angular/core';
import {Hero} from '../Models/Hero';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Phone} from '../Models/Phone';
import {Address} from '../Models/Address';
import {FieldService} from '../services/field.service';
import {OrmService} from "../services/orm.service";
import {LanguageService} from "../services/language.service";
import {lang} from "../../resources/lang";
import {CitiesList} from "../Models/CitiesList";
import {SuperPowersList} from "../Models/SuperPowersList";
@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {
  submitted = false;
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  citiesLists: CitiesList[];
  superPowersLists: SuperPowersList[];
  heroForm: FormGroup;
  phoneForms: FormGroup[];
  addressForms: FormGroup[];
  cityForms: FormGroup[];
  // function helpers
  constructor(private orm: OrmService, private fieldService: FieldService,
              private dialogRef: MatDialogRef<any>, private languageService: LanguageService) {
    this.phones = [];
    this.addresses = [];
    this.superPowersLists = [];
    this.citiesLists = [];
  }
  initHero() {
    this.hero = new Hero;
  }
  initHeroForm() {
    this.heroForm = new FormGroup({});
    this.fields.forEach(
      (field) => {
        this.heroForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
  }
  initPhoneForm() {
    this.phoneForms = [];
    this.addToForm(this.phoneForms, this.phoneFields);
  }
  initAddressForm() {
    this.addressForms = [];
    this.addToForm(this.addressForms, this.addressFields);
  }
  initCityForm() {
    this.cityForms = [];
    this.addToForm(this.cityForms, this.cityFields);
  }
  ngOnInit() {
    // hero form start
    this.initHero();
    // create the form group
    this.initHeroForm();
    this.initPhoneForm();
    this.initAddressForm();
    this.initCityForm();
    console.log(this.heroForm.controls);
  }

  save() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    this.heroForm.value.superpower.forEach(superpower => {
      this.superPowersLists.push({id: 0, superPowerId: this.orm.getSuperPowerId(superpower), parentId: 0});
    });
    this.cityForms.forEach(form => {
      this.citiesLists.push({id: 0, cityId: this.orm.getCityId(form.value.city), parentId: 0});
    });
    console.log('spl: ' + this.superPowersLists);
    console.log('cl: ' + this.citiesLists);

    this.phoneForms.forEach(
      phoneForm => {
        this.phones.push({
          id: 0,
          parentId: 0,
          number: phoneForm.value.phoneNumber,
          code: phoneForm.value.phoneCode,
          place: phoneForm.value.phonePlace
        });
      }
    );
    this.addressForms.forEach(
      addressForm => {
        this.addresses.push({
          id: 0,
          parentId: 0,
          place: addressForm.value.addressPlace,
          addressLoc: addressForm.value.addressLoc
        });
      }
    );
    // save city
    //   push new address Number
    this.addHero();
  }
  saveAndClose() {
    this.save();
    this.dialogRef.close();
  }

  addHero() {
    this.orm.addHero(this.hero, this.phones, this.addresses, this.superPowersLists, this.citiesLists);
  }
  getHeroById(id) {
    return this.orm.getHeroById(id);
  }
  getPhoneByParentId(id) {
    return this.orm.getPhoneByParentId(id);
  }
  getAddressByParentId(id) {
    return this.orm.getAddressByParentId(id);
  }

  addToForm(forms, fields) {
    forms.push(new FormGroup({}));
    forms.forEach(
      form => {
        fields.forEach(
          (field) => {
            form.addControl(field.key, new FormControl('', field.validators));
          }
        );
      });
  }

  removeForm(form: any, forms: any[]) {
    forms.splice(forms.indexOf(form), 1);
  }

  // add stuff
  get fields() {
    this.fieldService.getSuperPowerOptions();
    return this.fieldService.fields;
  }

  get phoneFields() {
    return this.fieldService.phoneFields;
  }

  get addressFields() {
    return this.fieldService.addressFields;
  }
  get cityFields() {
    this.fieldService.getProvinces();
    this.fieldService.getCities();
    return this.fieldService.cityFields;
  }
  disableSubmit(): boolean {
    return this.heroForm.invalid || this.formsInvalid(this.phoneForms) || this.formsInvalid(this.addressForms);
  }

  formsInvalid(forms): boolean {
    let bool = false;
    forms.forEach(form => {
        if (form.invalid) bool = true;
      }
    );
    return bool;
  }

  hideAdd(forms): boolean {
    if (this.formsInvalid(forms))
      return true;
    forms.forEach(
      form => {
        if (form.invalid) return true;
      }
    );
    return false;
  }

  hideRemove(forms): boolean {
    if (forms.length == 1)
      return true;
    return false;
  }

  clickAdd(to): void {
    switch (to) {
      case 'phone':
        this.addToForm(this.phoneForms, this.phoneFields);
        break;
      case 'address':
        this.addToForm(this.addressForms, this.addressFields);
        break;
      case 'city':
        this.addToForm(this.cityForms, this.cityFields);
        break;
    }
  }

  clickRemove(from, form): void {
    switch (from) {
      case 'phone':
        this.removeForm(form, this.phoneForms);
        break;
      case 'address':
        this.removeForm(form, this.addressForms);
        break;
      case 'city':
        this.removeForm(form, this.cityForms);
        break;
    }
  }

  get formText() {
    return lang[this.languageService.getLang()].addForm;
  }
  getSuperPowerIds(power) {
    return this.orm.getSuperPowerId(power);
  }

  onSubmit() {
    this.submitted = true;
  }
}
