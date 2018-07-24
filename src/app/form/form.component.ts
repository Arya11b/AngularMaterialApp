import { Component, OnInit } from '@angular/core';
import {Hero} from "../Hero";
import {HeroService} from "../hero.service";
import {MatDialogRef} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;
  hero: Hero;
  onSubmit() { this.submitted = true; }

  constructor( private service: HeroService, private dialogRef: MatDialogRef<FormComponent>) {
  }
  ngOnInit() {
    this.hero = new Hero;
  }
  save() {
    if(this.hasErrors()) return;
    this.addHero();
    this.dialogRef.close();
  }
  addHero() {
    console.log('function works');
    this.service.postHero(this.hero);
  }
  hasErrors(){
    if(!this.hero.alias || !this.hero.firstName || !this.hero.lastName || !this.hero.phoneNumber)
      return true;
    return false;
  }

}
