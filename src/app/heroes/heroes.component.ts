import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import {superHeros} from '../Superheroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HerosComponent implements OnInit {
  selectedHero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Batman',
    phoneNumber: '485389'
  };
  heroes = superHeros;
  constructor() { }

  ngOnInit() {
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}

