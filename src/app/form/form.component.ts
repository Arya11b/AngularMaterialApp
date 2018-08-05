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
  phoneForm: FormGroup;
  // function helpers
  phoneCount: number = 0;
  constructor( private orm: OrmService, private fieldService: FieldService, private dialogRef: MatDialogRef<FormComponent>) {
    this.phones = [];
    this.addresses = [];
  }
  initHero() {
    this.hero = new Hero;
    // add phone Number
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
    this.phoneForm = new FormGroup({});
    this.phoneFields.forEach(
      (field) => {
        this.phoneForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
  }
  addToPhoneForm() {
    // needs refinement
    let newPhone = this.fieldService.newPhone(++this.phoneCount);
    this.fieldService.phoneFields.push(newPhone);
    this.phoneForm.addControl(newPhone.key,new FormControl('', newPhone.validators));
    // this.phoneFields.forEach(
    //   (field) => {
    //     console.log(field.key+ (this.phoneCount));
    //     this.phoneForm.addControl(field.key + (this.phoneCount) , new FormControl('', field.validators));
    //   }
    // );
    console.log(this.phoneForm.controls);
    console.log(this.fieldService.phoneFields);
  }
  ngOnInit() {
    // hero form start
    this.initHero();
    // create the form group
    this.initHeroForm();
    this.initPhoneForm();
  }
  save() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    Object.keys(this.phoneForm.controls).forEach( control => {
      this.phones.push({
        id: 0,
        parentId: 0,
        number: this.phoneForm.get(control).value.number,
        code: '000',
        place: 'neverland'
      });
    });
    //   push new phone Number
    this.addHero();
    this.dialogRef.close();
  }
  addHero() {
    console.log(this.hero);
    this.orm.addHero(this.hero,this.phones,this.addresses);
  }

  // get stuff from forms
  get firstName() {
    return this.heroForm.get('firstName');
  }
  get lastName() {
    return this.heroForm.get('lastName');
  }
  get alias() {
    return this.heroForm.get('alias');
  }
  // add stuff
  addPhone(): void {
    console.log('clicked');
    // this.hero.phoneNumber.push(new Phone);
  }
  get fields() {
    return this.fieldService.fields;
  }
  get phoneFields() {
    return this.fieldService.phoneFields;
  }
  disableSubmit(): boolean {
    if (this.heroForm.invalid)
      return true;
    return false;
  }
  hideAdd(): boolean {
    if (this.phoneForm.invalid) {
      return true;
    }
    return false;
  }
  clickAdd(to): void {
    switch (to) {
      case 'phone': this.addToPhoneForm();
      break;
    }
  }
  onSubmit() { this.submitted = true; }
}
