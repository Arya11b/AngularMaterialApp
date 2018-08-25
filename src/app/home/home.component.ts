import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {lang} from "../../resources/lang";
import {MenuComponent} from "../menu/menu.component";
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  TREE_TEMP =  {
    Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
    Reminders: [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular'
      ]
  };
  constructor(private languageService: LanguageService) {
  }
  ngOnInit() {
  }
  get homeText() {
    return lang[this.languageService.getLang()].home;
  }

}
