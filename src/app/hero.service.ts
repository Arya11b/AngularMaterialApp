import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import { MessageService } from './message.service';
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
  constructor(private messageService: MessageService, private http: HttpClient) {
    this.dataStore = {heroes : []};
    this._Heroes = new BehaviorSubject<Hero[]>([]);
  }
  getHeroById(id) {
    return this.dataStore.heroes.find(x => x.id == id);
  }
  fetchData() {
    const heroesUrl = 'https://localhost:44392/api/hero';
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(heroesUrl)
      .subscribe(data => {
        this.dataStore.heroes = data;
        this._Heroes.next(Object.assign({}, this.dataStore).heroes);
      }, error => {
        console.log(console.log(error));
      });
  }
  getHeroes(): Observable<Hero[]> {
    return this._Heroes.asObservable();
  }
  getValidId(): number {
    return this.dataStore.heroes.length + 1;
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
