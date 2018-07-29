import { Component, OnInit } from '@angular/core';
import {Hero} from "../Models/Hero";
import {HeroService} from "../hero.service";
import {MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor( private service: HeroService, private dialogRef: MatDialogRef<FormComponent>) {
  }
  ngOnInit() {
    this.hero = new Hero;
    this.heroForm = new FormGroup({
      'firstName': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-z]*')
        ]
      ),
      'lastName': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-z]*')
        ]
      ),
      'alias': new FormControl(
        '',
        [
          Validators.required,
        ]
      ),
      'phoneNumber': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
    });
  }
  save() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    this.hero.phoneNumber.push({
      id: 0,
      parentId: this.hero.id,
      number: this.heroForm.value.phoneNumber,
      code: 'not implemented',
      place: 'not implemented'
    });
    this.addHero();
    this.dialogRef.close();
  }
  addHero() {
    console.log('function works');
    this.service.postHero(this.hero);
  }

  // get stuff
  get firstName() {
    return this.heroForm.get('firstName');
  }
  get lastName() {
    return this.heroForm.get('lastName');
  }
  get alias() {
    return this.heroForm.get('alias');
  }
  get phoneNumber() {
    return this.heroForm.get('phoneNumber');
  }

}
