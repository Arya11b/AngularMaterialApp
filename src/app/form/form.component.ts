import { Component, OnInit } from '@angular/core';
import {Hero} from '../Models/Hero';
import {HeroService} from '../hero.service';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Phone} from '../Models/Phone';
import {Address} from '../Models/Address';
import {FieldService} from "../field.service";
import {equal} from "assert";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;
  hero: Hero;
  heroForm: FormGroup;
  // validation messages
  validationMessages = {
    required: 'field is required',
    dirty: 'invalid symbol',
    min: 'too few characters',
    max: 'too many characters',
    phoneReq: 'must enter a phone number (this is a phonebook app for god\'s sake!)',
    namePat: 'invalid symbol',
    phonePat: 'invalid symbol only numbers allowed'
  };
  onSubmit() { this.submitted = true; }

  constructor( private heroService: HeroService, private fieldService: FieldService, private dialogRef: MatDialogRef<FormComponent>) {
  }
  initHero() {
    this.hero = new Hero;
    this.hero.phoneNumber = [];
    this.hero.phoneNumber.push(new Phone);
    this.hero.address = [];
    this.hero.address.push(new Address);
  }
  ngOnInit() {
    // hero form start
    this.initHero();
    // create the form group
    this.heroForm = new FormGroup({});
    // for (let field of this.fields)
    //   this.heroForm.addControl(field.key, new FormControl('', field.validator));
    this.fields.forEach(
      (field) => {
          this.heroForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
    console.log('behold');
    console.log(this.heroForm);
    // this.phoneForm = [];
    // this.phoneForm.push(new PhoneForm);
  }
  save() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    this.hero.phoneNumber = [];
    // this.phoneForm.forEach((p) => {
    //   this.hero.phoneNumber.push({
    //     id: 0,
    //     parentId: 0,
    //     number: p.phoneNumber,
    //     code: p.phoneCode,
    //     place: p.phonePlace
    //   });
    // });
    this.addHero();
    this.dialogRef.close();
  }
  addHero() {
    console.log('function works');
    this.heroService.postHero(this.hero);
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
    this.hero.phoneNumber.push(new Phone);
  }
  get fields() {
    return this.fieldService.fields;
  }
  disableSubmit(): boolean {
    if (this.heroForm.invalid)
      return true;
    return false;
  }
}
