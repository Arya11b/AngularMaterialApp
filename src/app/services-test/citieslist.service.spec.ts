import { TestBed, inject } from '@angular/core/testing';

import { CitieslistService } from '../services/citieslist.service';
import {APP_BASE_HREF} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../shared/material.module";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";
import {MenuComponent} from "../menu/menu.component";
import {AppComponent} from "../app.component";
import {FieldComponent} from "../form/field/field.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {MessagesComponent} from "../messages/messages.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HomeComponent} from "../home/home.component";
import {AppRoutingModule} from "../app-routing.module";

describe('CitieslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent , MenuComponent, HeroProfileComponent , FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CitieslistService, {provide: APP_BASE_HREF, useValue : '/' }]
    });
  });

  it('should be created', inject([CitieslistService], (service: CitieslistService) => {
    expect(service).toBeTruthy();
  }));
});
