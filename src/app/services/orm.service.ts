import { Injectable } from '@angular/core';
import {AddressService} from './address.service';
import {GroupService} from './group.service';
import {PhoneService} from './phone.service';
import {HeroService} from './hero.service';
import {Hero} from '../Models/Hero';
import {Group} from '../Models/Group';
import {Address} from '../Models/Address';
import {Phone} from '../Models/Phone';
import {Observable} from 'rxjs/index';
import {TodoService} from './todo.service';
import {ToDo} from "../Models/ToDo";
import {SuperpowerService} from "./superpower.service";
import {SuperPower} from "../Models/SuperPower";
import {CityService} from "./city.service";
import {SuperpowerslistService} from "./superpowerslist.service";
import {CitieslistService} from "./citieslist.service";
import {City} from "../Models/City";

@Injectable({
  providedIn: 'root'
})
export class OrmService {
  constructor(private heroService: HeroService, private phoneService: PhoneService,
              private addressService: AddressService, private groupService: GroupService,
              private todoService: TodoService, private superPowerService: SuperpowerService,
              private cityService: CityService, private superPowersListService: SuperpowerslistService,
              private citiesListService: CitieslistService) { }


  fetchData() {
    this.heroService.fetchHeroes();
    this.addressService.fetchAddresses();
    this.groupService.fetchGroups();
    this.phoneService.fetchPhones();
    this.todoService.fetchTodos();
    this.superPowerService.fetchSuperPowers();
    this.cityService.fetchCities();
    // this.citiesListService.fetchCitiesLists();
    // this.superPowersListService.fetchSuperPowersLists();
  }
  // crud
  addHero(hero, phones, addresses) {
    hero.id = this.getValidId(this.heroService.heroSet);
    this.heroService.postHero(hero);
    phones.forEach(phone => {
      phone.id = this.getValidId(this.phoneService.phoneSet);
      console.log('id: ' + phone.id);
      phone.parentId = hero.id;
      this.phoneService.postPhone(phone);
    });
    addresses.forEach(address => {
      address.id = this.getValidId(this.addressService.addressSet);
      console.log('id: ' + address.id);
      address.parentId = hero.id;
      this.addressService.postAddress(address);
    });
    // add superpowers
  }
  updateHero(hero, phones , addresses) {
    this.heroService.updateHero(hero.id, hero);
    this.getPhoneByParentId(hero.id).forEach(phone => {
      this.phoneService.deletePhone(phone);
    });
    this.getAddressByParentId(hero.id).forEach(address => {
      this.addressService.deleteAddress(address);
    });
    phones.forEach(phone => {
      phone.id = this.getValidId(this.phoneService.phoneSet);
      console.log('id: ' + phone.id);
      phone.parentId = hero.id;
      this.phoneService.postPhone(phone);
    });
    addresses.forEach(address => {
      address.id = this.getValidId(this.addressService.addressSet);
      console.log('id: ' + address.id);
      address.parentId = hero.id;
      this.addressService.postAddress(address);
    });    // this.phoneService.updatePhones(phones);
    // update superpowers
  }
  addTodo(todo, parentId) {
    todo.parentId = parentId;
    todo.id = this.getValidId(this.todoService.todoSet);
    console.log(todo);
    this.todoService.postTodo(todo);
  }
  removeTodo(todo) {
    this.todoService.deleteTodo(todo);
  }
  updateTodo(todo) {
    this.todoService.updateTodo(todo.id, todo);
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
  getTodoById(id) {
    return this.todoService.todoSet.find(x => x.id == id);
  }
  getAddressByParentId(parentId) {
    return this.addressService.addressSet.filter(x => x.parentId == parentId);
  }
  getPhoneByParentId(parentId) {
    return this.phoneService.phoneSet.filter(x => x.parentId == parentId);
  }
  getTodoByParentId(parentId) {
    console.log(this.todoService.todoSet);
    return this.todoService.todoSet.filter(x => x.parentId == parentId);
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
  getTodos(): Observable<ToDo[]> {
    return this.todoService._ToDos.asObservable();
  }
  getSuperPowers(): Observable<SuperPower[]> {
    return this.superPowerService._SuperPowers.asObservable();
  }
  getCities(): Observable<City[]> {
    return this.cityService._Cities.asObservable();
  }
  // superpower methods
  getSuperPowerCategories(): string[] {
    let categories = [];
    this.superPowerService.superPowerSet.forEach(superPower => {
      if (categories.indexOf(superPower.category) == -1) {
        categories.push(superPower.category);
      }
    });
    console.log('cat: ' + categories);
    return categories;
  }
  getSuperPowerTypes(): string[] {
    let types = [];
    this.superPowerService.superPowerSet.forEach(superPower => {
      if (types.indexOf(superPower.type) === -1)
        types.push(superPower.type);
    });
    return types;
  }
  getSuperPowerTypeByCategory(category) {
    let types = [];
    this.superPowerService.superPowerSet.filter(x => x.category === category)
      .forEach(superpower => {
        if(types.indexOf(superpower.type) === -1)
          types.push(superpower.type);
      });
    return types;
  }
  getSuperPowerByCategoryType(category, type) {
    let superPowers = [];
    this.superPowerService.superPowerSet.filter(x => x.category === category && x.type === type)
      .forEach(superpower => superPowers.push(superpower.power));
    return superPowers;
  }
  // CT methods (goshadism :))
  getCitiesByProvince(province): string[] {
    let cities: string[] = [];
    this.cityService.citySet.filter(x => x.province == province).forEach(city => cities.push(city.city));
    return cities;
  }
  getAllCities(): string[] {
    let cities: string[] = [];
    this.cityService.citySet.forEach(city => cities.push(city.city));
    return cities;
  }
  getProvinces(): string[] {
    let provinces: string[] = [];
    this.cityService.citySet.forEach(city => {
      if (provinces.indexOf(city.province) === -1)
        provinces.push(city.province);
    });
    return provinces;
  }
  // valid id
  getValidId(dataset): number {
    let id = 1;
    while (dataset.find(x => x.id == id)) id++;
    return id;
  }
}
