import { Component, OnInit } from '@angular/core';
import {Hero} from "../Models/Hero";
import {ActivatedRoute} from "@angular/router";
import {OrmService} from "../services/orm.service";
import {Address} from "../Models/Address";
import {Phone} from "../Models/Phone";
import {FormControl, FormGroup} from "@angular/forms";
import {FieldService} from "../services/field.service";

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  heroForm: FormGroup;
  phoneForms: FormGroup[];
  addressForms: FormGroup[];
  //
  fetchedHero: boolean = false;
  fetchedAddress: boolean = false;
  fetchedPhone: boolean = false;
  constructor(private route: ActivatedRoute, private service: OrmService, private fieldService: FieldService) { }
  initHeroForm() {
    this.fields.forEach(
      (field) => {
        this.heroForm.addControl(field.key, new FormControl('', field.validators));
        console.log(field.key);
      }
    );
    console.log(Object.keys(this.heroForm.controls));
    this.heroForm.get('firstName').setValue(this.hero.firstName);
    console.log(this.heroForm.value.firstName);
    this.heroForm.get('lastName').setValue(this.hero.lastName);
    this.heroForm.get('alias').setValue(this.hero.alias);

  }
  initPhonesForm() {
    this.phones.forEach( phone => {
      let formGroup = new FormGroup({});
      this.phoneFields.forEach( field => {
        formGroup.addControl(field.key, new FormControl('', field.validators));
      });
      formGroup.get('phoneCode').setValue(phone.code);
      formGroup.get('phoneNumber').setValue(phone.number);
      formGroup.get('phonePlace').setValue(phone.place);
      this.phoneForms.push(formGroup);
    });

  }
  initAddressesForm() {
    this.addresses.forEach( address => {
      let formGroup = new FormGroup({});
      this.addressFields.forEach( field => {
        formGroup.addControl(field.key, new FormControl('', field.validators));
      });
      formGroup.get('addressPlace').setValue(address.place);
      formGroup.get('addressLoc').setValue(address.addressLoc);
      this.addressForms.push(formGroup);
    });


  }
  ngOnInit() {
    this.phoneForms = [];
    this.addressForms = [];
    this.heroForm = new FormGroup({});

    this.phones = [];
    this.addresses = [];
    this.hero = {id:0 , parentId: 0 , picture: '' , firstName: '', lastName: '', alias: ''};
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
        console.log(this.hero);
        this.initHeroForm();
        this.fetchedHero = true;
      });
      this.service.getPhones().subscribe(phones => {
        if (phones.length == 0) return;
        this.phones = this.service.getPhoneByParentId(id);
        this.initPhonesForm();
        this.fetchedPhone = true;
      });
      this.service.getAddresses().subscribe(addresses => {
        if (addresses.length == 0) return;
        this.addresses = this.service.getAddressByParentId(id);
        this.initAddressesForm();
        this.fetchedAddress = true;
      });
    });

  }
  updateHero() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    this.phones = [];
    this.addresses = [];
    this.phoneForms.forEach(phoneForm => {
      this.phones.push({
        id: 0,
        parentId: this.hero.id,
        code: phoneForm.get('phoneCode').value,
        place: phoneForm.get('phonePlace').value,
        number: phoneForm.get('phoneNumber').value
      });
    });
    this.addressForms.forEach(addressForm => {
      this.addresses.push({
        id: 0,
        parentId: this.hero.id,
        place: addressForm.get('addressPlace').value,
        addressLoc: addressForm.get('addressLoc').value
      });
    });
    this.service.updateHero(this.hero, this.phones, this.addresses);
  }
  changeAvatar() {
    const avatarId = Math.floor(Math.random()*12) + 1;
    this.hero.picture = 'svg-' + avatarId;
  }
  // add stuff
  // to be interfaced
  get fields() {
    return this.fieldService.fields;
  }
  get phoneFields() {
    return this.fieldService.phoneFields;
  }
  get addressFields() {
    return this.fieldService.addressFields;
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
  disableSubmit(): boolean {
    return this.heroInvalid() || this.phoneInvalid() || this.addressInvalid();
  }
  heroInvalid(): boolean {
    if (this.heroForm.invalid) return true;
    return false;
  }
  phoneInvalid(): boolean {
    let bool = false;
    this.phoneForms.forEach(phoneForm => {
        if (phoneForm.invalid) bool = true;
      }
    );
    return bool;
  }
  addressInvalid(): boolean {
    let bool = false
    this.addressForms.forEach(addressForm => {
      if (addressForm.invalid) bool = true;
    });
    return bool;
  }
  hideAdd(): boolean {
    if(this.phoneInvalid())
      return true;
    this.phoneForms.forEach(
      phoneForm => {
        if (phoneForm.invalid) return true;
      }
    );
    return false;
  }
  hideRemove(): boolean{
    if (this.phoneForms.length == 1)
      return true;
    return false;
  }
  clickAdd(to): void {
    switch (to) {
      case 'phone': this.addToForm(this.phoneForms, this.phoneFields);
        break;
      case 'address': this.addToForm(this.addressForms, this.addressFields);
        break;
    }
  }
  clickRemove(from,form): void {
    switch (from) {
      case 'phone': this.removeForm(form, this.phoneForms);
        break;
      case 'address': this.removeForm(form, this.addressForms);
        break;
    }
  }

}
