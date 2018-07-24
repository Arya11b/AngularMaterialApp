import { Component, OnInit } from '@angular/core';
import {Hero} from "../Hero";
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero: Hero;
  constructor(private route: ActivatedRoute, private service: HeroService) { }

  ngOnInit() {
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
      });
    });
  }
  updateHero(){
    this.service.updateHero(this.hero.id,this.hero);
  }
  changeAvatar(){
    //console.log('it works');
    const avatarId = Math.floor(Math.random()*12) + 1;
    this.hero.picture = 'svg-' + avatarId;
  }
}
