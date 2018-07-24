import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import {HttpClient, HttpHeaders} from '@angular/common/http'; // for handling messages and shit
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
  private _Heroes: BehaviorSubject<Hero[]>;
  private dataStore: {
    heroes: Hero[]
  };
  constructor( private http: HttpClient) {
    this.dataStore = {heroes : []};
    this._Heroes = new BehaviorSubject<Hero[]>([]);
  }
  getHeroById(id) {
    return this.dataStore.heroes.find(x => x.id == id);
  }
  fetchData() {
    const heroesUrl = 'https://localhost:44392/api/hero';
    return this.http.get<Hero[]>(heroesUrl)
      .subscribe(data => {
        this.dataStore.heroes = data;
        this._Heroes.next(Object.assign({}, this.dataStore).heroes);
      }, error => {
        console.log(console.log(error));
      });
  }
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
  getHeroes(): Observable<Hero[]> {
    return this._Heroes.asObservable();
  }
  getValidId(): number {
    let id = 1;
    while(this.dataStore.heroes.find(x => x.id == id)) id++;
    return id;
  }
  assignAvatar(): string {
    return  'svg-' + (Math.floor(Math.random() * 12) + 1);
  }
  postHero(hero: Hero): Promise<Hero> {
    const heroesUrl = 'https://localhost:44392/api/hero';
    return new Promise((resolver, reject) => {
      hero.id = this.getValidId();
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
}
