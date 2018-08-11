import { HeroService } from './hero.service';
import { TestBed, inject } from '@angular/core/testing';
import {HomeComponent} from "../home/home.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {FieldComponent} from "../form/field/field.component";
import {AppComponent} from "../app.component";
import {MenuComponent} from "../menu/menu.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../shared/material.module";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {MessagesComponent} from "../messages/messages.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";


describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroEditComponent /*e*/, MessagesComponent, AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent, HeroDetailComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [HeroService, {provide: APP_BASE_HREF, useValue : '/' }]

    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
