import { TestBed, inject } from '@angular/core/testing';

import { OrmService } from './orm.service';
import {HomeComponent} from "../home/home.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {MessagesComponent} from "../messages/messages.component";
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

describe('OrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [OrmService, {provide: APP_BASE_HREF, useValue : '/' }]
    });
  });

  it('should be created', inject([OrmService], (service: OrmService) => {
    expect(service).toBeTruthy();
  }));
});
