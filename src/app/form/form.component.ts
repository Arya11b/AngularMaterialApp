import { Component, OnInit } from '@angular/core';
import {Hero} from '../Models/Hero';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Phone} from '../Models/Phone';
import {Address} from '../Models/Address';
import {FieldService} from '../services/field.service';
import {OrmService} from "../services/orm.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  heroForm: FormGroup;
  phoneForms: FormGroup[];
  addressForms: FormGroup[];
  // function helpers
  constructor( private orm: OrmService, private fieldService: FieldService, private dialogRef: MatDialogRef<FormComponent>) {
    this.phones = [];
    this.addresses = [];
  }
  initHero() {
    this.hero = new Hero;
    // add address Number
    // add Address
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
    this.addToPhoneForm();
  }
  initAddressForm() {
    this.addressForms = [];
    this.addToAddressForm();
  }
  addToPhoneForm() {
    this.phoneForms.push(new FormGroup({}));
    this.phoneForms.forEach(
      phoneForm => {
        this.phoneFields.forEach(
          (field) => {
            phoneForm.addControl(field.key, new FormControl('', field.validators));
          }
        );
      });
  }
  addToAddressForm() {
    this.addressForms.push(new FormGroup({}));
    this.addressForms.forEach(
      addressForm => {
        this.addressFields.forEach(
          (field) => {
            addressForm.addControl(field.key, new FormControl('', field.validators));
          }
        );
      });
  }
  ngOnInit() {
    // hero form start
    this.initHero();
    // create the form group
    this.initHeroForm();
    this.initPhoneForm();
    this.initAddressForm();
  }
  save() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
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
    //   push new address Number
    this.addHero();
    this.dialogRef.close();
  }
  addHero() {
    console.log(this.hero);
    this.orm.addHero(this.hero, this.phones, this.addresses);
  }

  // add stuff
  get fields() {
    return this.fieldService.fields;
  }
  get phoneFields() {
    return this.fieldService.phoneFields;
  }
  get addressFields() {
    return this.fieldService.addressFields;
  }
  disableSubmit(): boolean {
    if (this.heroForm.invalid)
      return true;
    return false;
  }
  hideAdd(): boolean {
    this.phoneForms.forEach(
      phoneForm => {
        if (phoneForm.invalid) return true;
      }
    );
    return false;
  }
  clickAdd(to): void {
    switch (to) {
      case 'phone': this.addToPhoneForm();
      break;
      case 'address': this.addToAddressForm();
      break;
    }
  }
  onSubmit() { this.submitted = true; }
}
