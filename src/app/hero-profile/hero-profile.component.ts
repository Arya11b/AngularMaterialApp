import { Component, OnInit } from '@angular/core';
import {Hero} from '../Models/Hero';
import {ActivatedRoute} from '@angular/router';
import {Address} from '../Models/Address';
import {Phone} from '../Models/Phone';
import {OrmService} from '../services/orm.service';
import {ToDo} from '../Models/ToDo';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  hero: Hero;
  phones: Phone[];
  addresses: Address[];
  todos: ToDo[];

  constructor(private service: OrmService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.phones = [];
    this.addresses = [];
    this.todos = [];

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
      this.service.getTodos().subscribe(todos => {
        if (todos.length < 0) return; // it can be zero
        this.todos = this.service.getTodoByParentId(id);
      });
    });
  }

}
