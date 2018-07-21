import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';
import {Observable} from "rxjs/index";
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  oHeroes: Observable<Hero[]>;
  selectedHero: Hero;
  constructor(private heroService: HeroService) {
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
    this.oHeroes = this.heroService.getHeroes();
    this.heroService.fetchData();
    this.oHeroes
      .subscribe(data => this.heroes = data);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}

