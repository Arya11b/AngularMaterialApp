import { TestBed, inject } from '@angular/core/testing';

import { SuperpowerService } from '../services/superpower.service';
import {APP_BASE_HREF} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {MenuComponent} from "../menu/menu.component";
import {AppComponent} from "../app.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";
import {FieldComponent} from "../form/field/field.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {MessagesComponent} from "../messages/messages.component";
import {HomeComponent} from "../home/home.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

describe('SuperpowerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent , MenuComponent, HeroProfileComponent , FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [SuperpowerService, {provide: APP_BASE_HREF, useValue : '/' }]
    });
  });

  it('should be created', inject([SuperpowerService], (service: SuperpowerService) => {
    expect(service).toBeTruthy();
  }));
});
