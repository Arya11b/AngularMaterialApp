import { Injectable } from '@angular/core';
import {Hero} from '../Models/Hero';
import {Phone} from '../Models/Phone';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from '../Models/Group';
import {Address} from '../Models/Address'; // for handling messages and shit
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
  private dataStore: { heroes: Hero[]};
  _Heroes: BehaviorSubject<Hero[]>;
  constructor( private http: HttpClient) {
    this.dataStore = { heroes : []};
    this._Heroes = new BehaviorSubject<Hero[]>([]);
  }

// class functions
  assignAvatar(): string {
    return  'svg-' + (Math.floor(Math.random() * 12) + 1);
  }

  // post request
  postHero(hero: Hero): Promise<Hero> {
    const heroesUrl = 'https://localhost:44392/api/hero';
    return new Promise((resolver, reject) => {
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
    const heroIdUrl = 'https://localhost:44392/api/hero/' + id;
    const heroesUrl = 'https://localhost:44392/api/hero';
    console.log(heroIdUrl);
    return new Promise((resolver, reject) => {
        this.http.put(heroIdUrl,hero).subscribe(
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
    return new Promise((resolver, reject) => {
        this.http.delete(heroesUrlDel).subscribe(
          hero => {
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
  // observables
  get heroSet() {
    return this.dataStore.heroes;
  }
}
