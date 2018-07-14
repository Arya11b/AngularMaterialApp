import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {superHeros} from '../Superheroes';
import {HeroService} from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HerosComponent implements OnInit {
  hero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Batman',
    phoneNumber: '485389'
  };
  heroes: Hero[];
  constructor(private heroService: HeroService) {
  }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.messageService.add('HeroService: fetched heroes');
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
  }
  onSelect(hero: Hero): void {
    this.hero = hero;
  }

}

