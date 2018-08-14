import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../Models/Hero';
import {MessagesComponent} from '../messages/messages.component';
import {OrmService} from '../services/orm.service';
import {Phone} from '../Models/Phone';
import {Address} from '../Models/Address';
import {MatDialog} from '@angular/material';
import {LanguageService} from "../services/language.service";
import {lang} from "../../resources/lang";
import {SuperPowersList} from "../Models/SuperPowersList";
import {CitiesList} from "../Models/CitiesList";
import {SuperPower} from "../Models/SuperPower";
import {City} from "../Models/City";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() phones: Phone[];
  @Input() addresses: Address[];
  @Input() superPowers: SuperPower[];
  @Input() cities: City[];
  constructor(private service: OrmService, private dialog: MatDialog, private languageService: LanguageService) { }

  ngOnInit() {
  }

  get heroDetailText() {
    return lang[this.languageService.getLang()].heroDetail;
  }
  deleteHero() {
    // delete hero dialog
    let dialogRef = this.dialog.open(MessagesComponent, {
      width: 'auto'
    });
    let citiesLists = [];
    this.cities.forEach(city => {
      citiesLists.push({parentId: this.hero.id, id: city.id});
    });
    let superPowersLists = [];
    this.superPowers.forEach(city => {
      superPowersLists.push({parentId: this.hero.id, id: city.id});
    });
    dialogRef.afterClosed().subscribe(result =>{
        if(result == 'yes')
          this.service.deleteHero(this.hero, this.phones, this.addresses, superPowersLists, citiesLists);
      }
    );
    // this.service.deleteHero(this.hero);
  }

}
