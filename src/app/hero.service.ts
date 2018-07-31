import { Injectable } from '@angular/core';
import {Hero} from './Models/Hero';
import {Phone} from './Models/Phone';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from "./Models/Group";
import {Address} from "./Models/Address"; // for handling messages and shit
//
// service in service scenario common
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : 'https://localhost:8080'
})
};
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // class initialization
  private _Heroes: BehaviorSubject<Hero[]>;
  private _Group: BehaviorSubject<Group[]>;
  private _Phone: BehaviorSubject<Phone[]>;
  private _Address: BehaviorSubject<Address[]>;
  private dataStore: {
    heroes: Hero[],
    groups: Group[],
    phones: Phone[],
    addresses: Address[]
  };
  constructor( private http: HttpClient) {
    this.dataStore = {heroes : [], groups : [], phones: [], addresses: []};
    this._Heroes = new BehaviorSubject<Hero[]>([]);
    this._Group = new BehaviorSubject<Group[]>([]);
    this._Address = new BehaviorSubject<Address[]>([]);
    this._Phone = new BehaviorSubject<Phone[]>([]);
  }
  // class functions
  getValidId(dataSet): number {
    let id = 1;
    while(dataSet.find(x => x.id == id)) id++;
    return id;
  }
  assignAvatar(): string {
    return  'svg-' + (Math.floor(Math.random() * 12) + 1);
  }
  getValidPhoneId(hero): void{
    for (let phoneNumber of hero.phoneNumber)
      phoneNumber.id = this.getValidId(this.dataStore.phones);
  }
  getValidAddressId(hero): void{
    for (let address of hero.address)
      address.id = this.getValidId(this.dataStore.addresses);
  }
  // get requests
  getHeroById(id) {
    return this.dataStore.heroes.find(x => x.id == id);
  }
  getPhoneByParentId(parentId) {
    return this.dataStore.phones.filter(x => x.parentId == parentId);
  }
  getAddressByParentId(parentId) {
    return this.dataStore.addresses.filter(x => x.parentId == parentId);
  }
  // post request
  postHero(hero: Hero): Promise<Hero> {
    const heroesUrl = 'https://localhost:44392/api/hero';
    return new Promise((resolver, reject) => {
        hero.id = this.getValidId(this.dataStore.heroes);
        this.getValidPhoneId(hero);
        this.getValidAddressId(hero);
        for (let phoneNumber of hero.phoneNumber)
          phoneNumber.parentId = hero.id;
        hero.picture = this.assignAvatar();
        this.dataStore.heroes.push(hero);
        this.http.post(heroesUrl, hero, httpOptions).subscribe(
          hero => {
            this._Heroes.next(Object.assign({}, this.dataStore).heroes);
            console.log(hero);
          }
        );
        resolver(hero);
      }
    );
  }
  // put request
  updateHero(id: number, hero: Hero){
    console.log(hero);
    const heroesUrlDel = 'https://localhost:44392/api/hero/' + id;
    const heroesUrl = 'https://localhost:44392/api/hero';
    console.log(heroesUrlDel);
    return new Promise((resolver, reject) => {
        this.http.put(heroesUrlDel,hero).subscribe(
          hero => {
            console.log(hero);
            this.http.get<Hero[]>(heroesUrl)
              .subscribe(
                data => {
                  this.dataStore.heroes = data;
                  this._Heroes.next(Object.assign({}, this.dataStore).heroes);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(hero);
      }
    );
  }
  // delete request
  deleteHero(hero: Hero){
    console.log(hero);
    const heroesUrlDel = 'https://localhost:44392/api/hero/' + hero.id;
    const heroesUrl = 'https://localhost:44392/api/hero';
    console.log(heroesUrlDel);
    return new Promise((resolver, reject) => {
        this.http.delete(heroesUrlDel).subscribe(
          hero => {
            console.log(hero);
            this.http.get<Hero[]>(heroesUrl)
              .subscribe(
                data => {
                  this.dataStore.heroes = data;
                  this._Heroes.next(Object.assign({}, this.dataStore).heroes);
                }, error => {
                  console.log(console.log(error));
                });
          }
        );
        resolver(hero);
      }
    );
  }
  // fetch Datas
  fetchHeroes() {
    const heroesUrl = 'https://localhost:44392/api/hero';
    return this.http.get<Hero[]>(heroesUrl)
      .subscribe(data => {
        this.dataStore.heroes = data;
        this._Heroes.next(Object.assign({}, this.dataStore).heroes);
      }, error => {
        console.log(error);
      });
  }
  fetchAddresses() {
    const url = 'https://localhost:44392/api/address';
    return this.http.get<Address[]>(url)
      .subscribe(data => {
        this.dataStore.addresses = data;
        this._Address.next(Object.assign({}, this.dataStore).addresses);
      }, error => {
        console.log(console.log(error));
      });
  }
  fetchPhones() {
    const url = 'https://localhost:44392/api/phone';
    return this.http.get<Phone[]>(url)
      .subscribe(data => {
        this.dataStore.phones = data;
        this._Phone.next(Object.assign({}, this.dataStore).phones);
      }, error => {
        console.log(console.log(error));
      });
  }
  fetchGroups() {
    const url = 'https://localhost:44392/api/group';
    return this.http.get<Group[]>(url)
      .subscribe(data => {
        this.dataStore.groups = data;
        this._Group.next(Object.assign({}, this.dataStore).groups);
      }, error => {
        console.log(console.log(error));
      });
  }
  fetchData() {
    this.fetchHeroes();
    this.fetchAddresses();
    this.fetchGroups();
    this.fetchPhones();
  }
  // observables
  getHeroes(): Observable<Hero[]> {
    return this._Heroes.asObservable();
  }
  getPhones(): Observable<Phone[]> {
    return this._Phone.asObservable();
  }
  getAddresses(): Observable<Address[]> {
    return this._Address.asObservable();
  }
  getGroups(): Observable<Group[]> {
    return this._Group.asObservable();
  }
}
