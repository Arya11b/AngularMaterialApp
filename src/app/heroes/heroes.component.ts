import { Component, OnInit } from '@angular/core';
import {Hero} from '../Models/Hero';
import {HeroService} from '../services/hero.service';
import {Observable} from 'rxjs/index';
import {OrmService} from "../services/orm.service";
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  oHeroes: Observable<Hero[]>;
  public selectedHero: Hero;
  constructor(private service: OrmService) {
    // this.heroes = [{
    //   id: 312,
    //   alias: 'this is wrong',
    //   phoneNumber: '75298'
    // }];
  }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.oHeroes = this.service.getHeroes();
    this.service.fetchData();
    this.oHeroes
      .subscribe(data => {
        this.heroes = data;
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}

