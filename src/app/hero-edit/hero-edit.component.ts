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
  constructor(private route: ActivatedRoute, private service: OrmService, private fieldService: FieldService) { }
  initForms() {
    this.heroForm = new FormGroup({});
    this.addressForms = [];
    this.phoneForms = [];
    this.fields.forEach(
      (field) => {
        this.heroForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
    this.heroForm.get('firstName').setValue(this.hero.firstName);
    this.heroForm.get('lastName').setValue(this.hero.lastName);
    this.heroForm.get('alias').setValue(this.hero.alias);
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
    this.phones = [];
    this.addresses = [];
    this.hero = new Hero;
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
        console.log(this.hero);
      });
      this.service.getPhones().subscribe(phones => {
        if (phones.length == 0) return;
        this.phones = this.service.getPhoneByParentId(id);
        console.log(this.phones);
      });
      this.service.getAddresses().subscribe(addresses => {
        if (addresses.length == 0) return;
        this.addresses = this.service.getAddressByParentId(id);
      });
    });
    this.initForms();
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
    //console.log('it works');
    const avatarId = Math.floor(Math.random()*12) + 1;
    this.hero.picture = 'svg-' + avatarId;
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


}
