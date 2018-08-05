import { Injectable } from '@angular/core';
import {AddressService} from "./address.service";
import {GroupService} from "./group.service";
import {PhoneService} from "./phone.service";
import {HeroService} from "./hero.service";
import {Hero} from "../Models/Hero";
import {Group} from "../Models/Group";
import {Address} from "../Models/Address";
import {Phone} from "../Models/Phone";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class OrmService {
  constructor(private heroService: HeroService, private phoneService: PhoneService,
              private addressService: AddressService, private groupService: GroupService) { }

  getPhoneByParentId(parentId) {
    return this.phoneService.phoneSet.filter(x => x.parentId == parentId);
  }
  fetchData() {
    this.heroService.fetchHeroes();
    this.addressService.fetchAddresses();
    this.groupService.fetchGroups();
    this.phoneService.fetchPhones();
  }
  // crud
  addHero(hero, phones, addresses) {
    hero.id = this.getValidId(this.heroService.heroSet);
    phones.forEach(phone => {
      phone.id = this.getValidId(this.phoneService.phoneSet);
      phone.parentId = hero.id;
    });
    addresses.forEach(address => {
      address.id = this.getValidId(this.addressService.addressSet);
      address.parentId = hero.id;
    });
    this.heroService.postHero(hero);
    this.phoneService.postPhones(phones);
    this.addressService.postAddresses(addresses);
  }
  updateHero(hero, phones , addresses) {
    this.heroService.updateHero(hero.id, hero);
    this.phoneService.updatePhones(phones);
    this.addressService.updateAddresses(addresses);
  }
  deleteHero(hero, phones, addresses) {
    this.heroService.deleteHero(hero);
    this.phoneService.deletePhones(phones);
    this.addressService.deleteAddresses(addresses);
  }
  // get requests
  getHeroById(id) {
    return this.heroService.heroSet.find(x => x.id == id);
  }
  getAddressByParentId(parentId) {
    return this.addressService.addressSet.filter(x => x.parentId == parentId);
  }

  // get stuff as observable
  getHeroes(): Observable<Hero[]> {
    return this.heroService._Heroes.asObservable();
  }
  getPhones(): Observable<Phone[]> {
    return this.phoneService._Phones.asObservable();
  }
  getGroups(): Observable<Group[]> {
    return this.groupService._Groups.asObservable();
  }
  getAddresses(): Observable<Address[]> {
    return this.addressService._Addresses.asObservable();
  }
  // valid id
  getValidId(dataset): number {
    let id = 1;
    while(dataset.find(x => x.id == id)) id++;
    return id;
  }
}
