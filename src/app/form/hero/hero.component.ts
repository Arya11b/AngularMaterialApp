import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero} from "../../Models/Hero";
import {FieldService} from "../../services/field.service";
import {SuperPower} from "../../Models/SuperPower";
import {SuperPowersList} from "../../Models/SuperPowersList";
import {OrmService} from "../../services/orm.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  heroForm: FormGroup;

  constructor(private fieldService: FieldService, private orm: OrmService) {
  }

  initHeroForm() {
    this.heroForm = new FormGroup({});
    this.fields.forEach(
      (field) => {
        this.heroForm.addControl(field.key, new FormControl('', field.validators));
      }
    );
  }

  ngOnInit() {
    this.initHeroForm();
  }

  get fields() {
    this.fieldService.getSuperPowerOptions();
    return this.fieldService.fields;
  }

  public formIsInvalid(): boolean {
    return this.heroForm.invalid;
  }

  public getFormHeroData(): Hero {
    return {
        id: 0,
        parentId: 0,
        firstName: this.heroForm.value.firstName,
        lastName: this.heroForm.value.lastName,
        alias: this.heroForm.value.alias,
        picture: ''
      };
  }
  public getFormSpData(): SuperPowersList[] {
    let result = [];
    this.heroForm.value.superpower.forEach(superpower => {
      result.push({id: 0, superPowerId: this.orm.getSuperPowerId(superpower), parentId: 0});
    });
    return result;
  }


}
