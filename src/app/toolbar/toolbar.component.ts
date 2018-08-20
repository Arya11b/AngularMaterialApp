import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {MatDialog} from "@angular/material";
import {lang} from "../../resources/lang";
import {SignFormComponent} from "../sign-form/sign-form.component";
import {Hero} from "../Models/Hero";
import {CitiesList} from "../Models/CitiesList";
import {SuperPowersList} from "../Models/SuperPowersList";
import {Address} from "../Models/Address";
import {Phone} from "../Models/Phone";
import {OrmService} from "../services/orm.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme =  new EventEmitter<void>();
  @Output() toggleRtl =  new EventEmitter<void>();
  @Input() lang = [];
  // god mode defs
  heroes: Hero[];
  phones: Phone[];
  addresses: Address[];
  // citiesLists: CitiesList[];
  // superpowersLists: SuperPowersList[];
  constructor(private dialog: MatDialog, private service: OrmService) { }

  ngOnInit() {
    this.service.getHeroes().subscribe(heroes => {
      if (heroes.length == 0) return;
      this.heroes = heroes;
    });
    this.service.getPhones().subscribe(phones => {
      if (phones.length == 0) return;
      this.phones = phones;
    });
    this.service.getAddresses().subscribe(addresses => {
      if (addresses.length == 0) return;
      this.addresses = addresses;
    });
  }
  openDialog() {
    let dialogRef = this.dialog.open(SignFormComponent, {width: '450px'});
  }
  getHeroPhones(id){
    return this.service.getPhoneByParentId(id);
  }
  getHeroAddresses(id){
    return this.service.getAddressByParentId(id);

  }
}
