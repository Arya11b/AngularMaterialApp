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
import {SuperPowersList} from "../Models/SuperPowersList";
import {CitiesList} from "../Models/CitiesList";

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
    this.citiesListService.fetchCitiesLists();
    this.superPowersListService.fetchSuperPowersLists();
  }
  // crud
  addHero(hero, phones, addresses, superPowersLists, citiesLists) {
    hero.id = this.getValidId(this.heroService.heroSet);
    superPowersLists.forEach(superpower => {
      superpower.parentId = hero.id;
      superpower.id = this.getValidId(this.superPowersListService.superPowersListSet);
      this.superPowersListService.postSuperPowersList(superpower);
    });
    citiesLists.forEach(city => {
      city.parentId = hero.id;
      city.id = this.getValidId(this.citiesListService.citiesListSet);
      this.citiesListService.postCitiesList(city);
    });
    this.heroService.postHero(hero);
    phones.forEach(phone => {
      phone.id = this.getValidId(this.phoneService.phoneSet);
      phone.parentId = hero.id;
      this.phoneService.postPhone(phone);
    });
    addresses.forEach(address => {
      address.id = this.getValidId(this.addressService.addressSet);
      address.parentId = hero.id;
      this.addressService.postAddress(address);
    });
    // add superpowers
  }
  updateHero(hero, phones , addresses, superPowersLists, citiesLists) {
    this.heroService.updateHero(hero.id, hero);
    this.getPhoneByParentId(hero.id).forEach(phone => {
      this.phoneService.deletePhone(phone);
    });
    this.getAddressByParentId(hero.id).forEach(address => {
      this.addressService.deleteAddress(address);
    });
    this.getSuperPowerByParentId(hero.id).forEach(superpower => {
      this.superPowersListService.deleteSuperPowersList(superpower);
    });
    this.getCityByParentId(hero.id).forEach(city => {
      this.citiesListService.deleteCitiesList(city);
    });
    phones.forEach(phone => {
      phone.id = this.getValidId(this.phoneService.phoneSet);
      phone.parentId = hero.id;
      this.phoneService.postPhone(phone);
    });
    addresses.forEach(address => {
      address.id = this.getValidId(this.addressService.addressSet);
      address.parentId = hero.id;
      this.addressService.postAddress(address);
    });
    superPowersLists.forEach(superpower => {
      superpower.parentId = hero.id;
      this.superPowersListService.postSuperPowersList(superpower);
    });
    citiesLists.forEach(city => {
      city.parentId = hero.id;
      this.citiesListService.postCitiesList(city);
    });
    // this.phoneService.updatePhones(phones);
    // update superpowers
  }
  addTodo(todo, parentId) {
    todo.parentId = parentId;
    todo.id = this.getValidId(this.todoService.todoSet);
    this.todoService.postTodo(todo);
  }
  removeTodo(todo) {
    this.todoService.deleteTodo(todo);
  }
  updateTodo(todo) {
    this.todoService.updateTodo(todo.id, todo);
  }
  deleteHero(hero, phones, addresses, superPowersLists, citiesLists) {
    this.heroService.deleteHero(hero);
    this.phoneService.deletePhones(phones);
    this.addressService.deleteAddresses(addresses);
    this.superPowersListService.deleteSuperPowersLists(superPowersLists);
    this.citiesListService.deleteCitiesLists(citiesLists);
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
  getCitiesLists(): Observable<CitiesList[]>{
    return this.citiesListService._CitiesLists.asObservable();
  }
  getSuperPowersLists(): Observable<SuperPowersList[]> {
    return this.superPowersListService._SuperPowersLists.asObservable();
  }
  // superpower methods
  getSuperPowerId(power): number {
    return this.superPowerService.superPowerSet.find(x => x.power == power ).id;
  }
  getSuperPowerById(id): SuperPower {
    return this.superPowerService.superPowerSet.find(x => x.id == id );
  }
  getSuperPowerByParentId(heroId): SuperPowersList[] {
    return this.superPowersListService.superPowersListSet.filter(x => x.parentId == heroId);
  }
  getSuperPowerCategories(): string[] {
    let categories = [];
    this.superPowerService.superPowerSet.forEach(superPower => {
      if (categories.indexOf(superPower.category) == -1) {
        categories.push(superPower.category);
      }
    });
    return categories;
  }
  getSuperPowerByCategory(category) {
    let superPowers = [];
    this.superPowerService.superPowerSet.filter(x => x.category === category)
      .forEach(superpower => superPowers.push(superpower.power));
    return superPowers;
  }
  // CT methods (goshadism :))
  getCityId(city): number {
    return this.cityService.citySet.find(x => x.city == city ).id;
  }
  getCityById(id): City {
    return this.cityService.citySet.find(x => x.id == id );
  }

  getCityByParentId(heroId): CitiesList[] {
    return this.citiesListService.citiesListSet.filter(x => x.parentId == heroId);
  }
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
  getCitiesByCitiesList(citiesLists) {
    let cities = [];
    citiesLists.forEach(citiesList => {
      cities.push(this.getCityById(citiesList.cityId));
    });
    return cities;
  }
  getSuperPowersBySuperPowersList(superPowersLists) {
    let superpowers = [];
    superPowersLists.forEach(superPowersList => {
      superpowers.push(this.getSuperPowerById(superPowersList.superPowerId));
    });
    return superpowers;
  }
  // valid id
  getValidId(dataset): number {
    let id = 1;
    while (dataset.find(x => x.id == id)) id++;
    return id;
  }
}
