import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {superHeroes} from './Superheroes';
import {BehaviorSubject, Observable, of} from 'rxjs'; // for handling async data sync :)
import { MessageService } from './message.service';
import {HttpClient} from '@angular/common/http'; // for handling messages and shit
// service in service scenario common
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
    this.messageService.add('HeroService: fetched heroes');
    const heroesUrl = 'https://localhost:44392/api/hero';
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
}
