import { Component, OnInit } from '@angular/core';
import {Hero} from "../Models/Hero";
import {ActivatedRoute} from "@angular/router";
import {OrmService} from "../services/orm.service";
import {Address} from "../Models/Address";
import {Phone} from "../Models/Phone";

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  constructor(private route: ActivatedRoute, private service: OrmService) { }

  ngOnInit() {
    const id = this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
        this.addresses = this.service.getAddressByParentId(id);
      });
      this.service.getPhones().subscribe(phones => {
        if (phones.length == 0) return;
        this.phones = this.service.getPhoneByParentId(id);
      });
      this.service.getAddresses().subscribe(addresses => {
        if (addresses.length == 0) return;
        this.addresses = this.service.getAddressByParentId(id);
      });
    });
  }
  updateHero() {
    this.service.updateHero(this.hero, this.phones, this.addresses);
  }
  changeAvatar() {
    //console.log('it works');
    const avatarId = Math.floor(Math.random()*12) + 1;
    this.hero.picture = 'svg-' + avatarId;
  }
}
