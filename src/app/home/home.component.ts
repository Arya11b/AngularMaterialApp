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
  constructor(private languageService: LanguageService) {
  }
  ngOnInit() {
  }
  get homeText() {
    return lang[this.languageService.getLang()].home;
  }

}
