import {Component, OnInit} from '@angular/core';
import {Hero} from '../Models/Hero';
import {ActivatedRoute} from '@angular/router';
import {Address} from '../Models/Address';
import {Phone} from '../Models/Phone';
import {OrmService} from '../services/orm.service';
import {ToDo} from '../Models/ToDo';
import {City} from "../Models/City";
import {SuperPower} from "../Models/SuperPower";

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  superPowers: SuperPower[];
  cities: City[];

  constructor(private service: OrmService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.phones = [];
    this.addresses = [];
    this.superPowers = [];
    this.cities = [];

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
      });
      this.service.getPhones().subscribe(phones => {
        if (phones.length == 0) return;
        this.phones = this.service.getPhoneByParentId(id);
      });
      this.service.getAddresses().subscribe(addresses => {
        if (addresses.length == 0) return;
        this.addresses = this.service.getAddressByParentId(id);
      });


      this.service.getCitiesLists().subscribe(citiesLists => {
        if (citiesLists.length == 0) return;
        this.service.getCities().subscribe(cities => {
          if (cities.length == 0) return;
          let cLists = this.service.getCityByParentId(id);
          this.cities = this.getCityByIds(cLists);
          console.log('ll' + this.cities);
        });
      });
      this.service.getSuperPowersLists().subscribe(superpowersLists => {
        if (superpowersLists.length == 0) return;
        this.service.getSuperPowers().subscribe(superpowers => {
          if (superpowers.length == 0) return;
          let spLists = this.service.getSuperPowerByParentId(id);
          this.superPowers = this.getSuperPowerByIds(spLists);
        });
      });
    });
  }

  getSuperPowerByIds(spLists) {
    let list = [];
    spLists.forEach(spList => {
      list.push(this.service.getSuperPowerById(spList.superPowerId));
    });
    return list;
  }

  getCityByIds(cLists) {
    console.log(['ccc' , cLists]);
    let list = [];
    cLists.forEach(cList => {
      list.push(this.service.getCityById(cList.cityId));
    });
    return list;
  }

}
