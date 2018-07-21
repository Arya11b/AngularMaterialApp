import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {superHeroes} from './Superheroes';
import {Observable, of} from 'rxjs'; // for handling async data sync :)
import { MessageService } from './message.service';
import {HttpClient} from '@angular/common/http'; // for handling messages and shit
// service in service scenario common
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private dataStore: {
    heroes: Hero[]
  };
  constructor(private messageService: MessageService, private http: HttpClient) {
    this.dataStore = {heroes : []};
  }
  fetchData(): void{
    this.messageService.add('HeroService: fetched heroes');
    const heroesUrl = 'https://localhost:5001/api/Person';
    return this.http.get<Hero>(heroesUrl)
      .subscribe(data => {
        this.dataStore.heroes = data;
      }, error => {
        console.log('failed to load data');
      });
  }
  getHeroes(): Observable<Hero[]> {
    this.fetchData();
    return of(this.dataStore.heroes);
  }
}
