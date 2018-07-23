import { Component, OnInit } from '@angular/core';
import {Hero} from "../Hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;
  hero: Hero;
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.hero); }
  constructor(private service: HeroService) { }

  ngOnInit() {
    this.hero = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      alias: '',
      id: 0,
      picture: 'form-1',
    };
  }
  addHero() {
    console.log('function works');
    this.service.postHero(this.hero);
  }

}
