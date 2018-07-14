import { Injectable } from '@angular/core';
import {Hero} from './Hero';
import {superHeroes} from './Superheroes';
import {Observable, of} from 'rxjs'; // for handling async data sync :)
import { MessageService } from './message.service'; // for handling messages and shit
// service in service scenario common
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private meassageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    return of(superHeroes);
  }
}
