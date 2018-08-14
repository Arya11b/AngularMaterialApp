import {Component, OnInit} from '@angular/core';
import {Hero} from "../Models/Hero";
import {ActivatedRoute} from "@angular/router";
import {OrmService} from "../services/orm.service";
import {Address} from "../Models/Address";
import {Phone} from "../Models/Phone";
import {FormControl, FormGroup} from "@angular/forms";
import {FieldService} from "../services/field.service";
import {lang} from "../../resources/lang";
import {LanguageService} from "../services/language.service";
import {CitiesList} from "../Models/CitiesList";
import {SuperPowersList} from "../Models/SuperPowersList";
import {City} from "../Models/City";
@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  citiesLists: CitiesList[];
  superPowersLists: SuperPowersList[];
  heroForm: FormGroup;
  phoneForms: FormGroup[];
  addressForms: FormGroup[];
  cityForms: FormGroup[];
  //
  fetchedHero: boolean = false;
  fetchedAddress: boolean = false;
  fetchedPhone: boolean = false;
  fetchedSuperpower: boolean = false;
  fetchedCity: boolean = false;

  constructor(private route: ActivatedRoute, private service: OrmService, private fieldService: FieldService,
              private languageService: LanguageService) {
  }

  initHeroForm() {
    this.fields.forEach(
      (field) => {
        this.heroForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
    this.heroForm.get('firstName').setValue(this.hero.firstName);
    this.heroForm.get('lastName').setValue(this.hero.lastName);
    this.heroForm.get('alias').setValue(this.hero.alias);
    this.service.getSuperPowersLists().subscribe(superpowersLists => {
      if (superpowersLists.length == 0) return;
      let sps = [];
      let spLists = this.service.getSuperPowerByParentId(this.hero.id);
      this.service.getSuperPowers().subscribe(superpowers => {
        if (superpowers.length == 0) return;
        let list = this.service.getSuperPowersBySuperPowersList(spLists);
        list.forEach(element => {
          sps.push(element.power);
        });
      });
      this.heroForm.get('superpower').setValue(sps); // change
    });

  }

  initPhonesForm() {
    this.phones.forEach(phone => {
      let formGroup = new FormGroup({});
      this.phoneFields.forEach(field => {
        formGroup.addControl(field.key, new FormControl('', field.validators));
      });
      formGroup.get('phoneCode').setValue(phone.code);
      formGroup.get('phoneNumber').setValue(phone.number);
      formGroup.get('phonePlace').setValue(phone.place);
      this.phoneForms.push(formGroup);
    });

  }

  initAddressesForm() {
    this.addresses.forEach(address => {
      let formGroup = new FormGroup({});
      this.addressFields.forEach(field => {
        formGroup.addControl(field.key, new FormControl('', field.validators));
      });
      formGroup.get('addressPlace').setValue(address.place);
      formGroup.get('addressLoc').setValue(address.addressLoc);
      this.addressForms.push(formGroup);
    });
  }

  initCitiesForm() {
    let cities = [];
    this.service.getCities().subscribe(cities => {
      if (cities.length == 0)return;
      cities = this.service.getCitiesByCitiesList(this.citiesLists);
      cities.forEach(city => {
        let formGroup = new FormGroup({});
        this.cityFields.forEach(field => {
          formGroup.addControl(field.key, new FormControl('', field.validators));
        });
        formGroup.get('province').setValue(city.province);
        formGroup.get('city').setValue(city.city);
        this.cityForms.push(formGroup);
      });
    });
  }

  ngOnInit() {
    this.phoneForms = [];
    this.addressForms = [];
    this.cityForms = [];
    this.heroForm = new FormGroup({});

    this.phones = [];
    this.addresses = [];
    this.hero = {id: 0, parentId: 0, picture: '', firstName: '', lastName: '', alias: ''};
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
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
      this.service.getCitiesLists().subscribe(cLists => {
        if (cLists.length == 0) return;
        this.citiesLists = this.service.getCityByParentId(id);
        this.initCitiesForm();
        this.fetchedCity = true;
      });
    });

  }

  updateHero() {
    this.hero.firstName = this.heroForm.value.firstName;
    this.hero.lastName = this.heroForm.value.lastName;
    this.hero.alias = this.heroForm.value.alias;
    this.phones = [];
    this.addresses = [];
    this.citiesLists = [];
    this.superPowersLists = [];
    this.heroForm.value.superpower.forEach(power => {
      this.superPowersLists.push({
        id: 0,
        parentId: this.hero.id,
        superPowerId: this.service.getSuperPowerId(power)
      });
    });
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

    this.cityForms.forEach(cityForm => {
      this.citiesLists.push({
        id: 0,
        parentId: this.hero.id,
        cityId: this.service.getCityId(cityForm.get('city').value)
      });
    });
    this.service.updateHero(this.hero, this.phones, this.addresses, this.superPowersLists, this.citiesLists);
  }

  changeAvatar() {
    const avatarId = Math.floor(Math.random() * 12) + 1;
    this.hero.picture = 'svg-' + avatarId;
  }

  // add stuff
  // to be interfaced
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
    return this.heroInvalid() || this.formsInvalid(this.phoneForms) || this.formsInvalid(this.addressForms) || this.formsInvalid(this.cityForms);
  }

  heroInvalid(): boolean {
    if (this.heroForm.invalid) return true;
    return false;
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

  get heroEditText() {
    return lang[this.languageService.getLang()].heroEdit;
  }

  fetchedAll() {
    return this.fetchedHero && this.fetchedPhone && this.fetchedAddress && this.fetchedCity;
  }

}
