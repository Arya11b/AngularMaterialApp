import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {ProvinceComponent} from "../form/province/province.component";
import {PhoneComponent} from "../form/phone/phone.component";
import {HeroComponent} from "../form/hero/hero.component";
import {AddressComponent} from "../form/address/address.component";
import {TreeFieldComponent} from "../form/tree-field/tree-field.component";
@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {
  @ViewChild('hero') heroComponent: HeroComponent;
  @ViewChild('phone') phoneComponent: PhoneComponent;
  @ViewChild('address') addressComponent: AddressComponent;
  @ViewChild('province') provinceComponent: ProvinceComponent;
  @ViewChild('superpower') superpowerComponent: TreeFieldComponent; //change the name
  submitted = false;
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  citiesLists: CitiesList[];
  superPowersLists: SuperPowersList[];
  // for getting values
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
  ngOnInit() {
    this.initHero();
  }
  // save functions
  save() {
    this.hero = this.heroComponent.getFormHeroData();
    this.superPowersLists = this.superpowerComponent.getFormSpData();
    this.citiesLists = this.provinceComponent.getFormDatas();
    this.phones = this.phoneComponent.getFormDatas();
    this.addresses = this.addressComponent.getFormDatas();
    this.addHero();
  }
  onSubmit() {
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
  // add stuff
  disableSubmit(): boolean {
    return this.phoneComponent.formsAreInvalid() || this.heroComponent.formIsInvalid() || this.addressComponent.formsAreInvalid() || this.provinceComponent.formsAreInvalid()
    // implement
  }
  get formText() {
    return lang[this.languageService.getLang()].addForm;
  }
}
