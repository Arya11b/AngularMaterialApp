import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../Models/Hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../services/hero.service';
import {FormComponent} from "../form/form.component";
import {MatDialog} from "@angular/material";
import {MessagesComponent} from "../messages/messages.component";
import {OrmService} from "../services/orm.service";
import {Phone} from "../Models/Phone";
import {Address} from "../Models/Address";
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  constructor(private route: ActivatedRoute, private service: OrmService,private dialog: MatDialog) { }

  ngOnInit() {
    this.phones = [];
    this.addresses = [];
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('nginit');
      this.service.getHeroes().subscribe(heroes => {
        if (heroes.length == 0) return;
        this.hero = this.service.getHeroById(id);
        console.log(this.hero);
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
  deleteHero(){
    // delete hero dialog
    let dialogRef = this.dialog.open(MessagesComponent,{
      width: 'auto'
    });
    dialogRef.afterClosed().subscribe(result =>{
        if(result == 'yes')
          this.service.deleteHero(this.hero,this.phones,this.addresses);
      }
    );
      // this.service.deleteHero(this.hero);
  }
}
