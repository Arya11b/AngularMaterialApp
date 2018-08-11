import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from '../services/todo.service';
import {APP_BASE_HREF} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";
import {MessagesComponent} from "../messages/messages.component";
import {AppComponent} from "../app.component";
import {MenuComponent} from "../menu/menu.component";
import {HomeComponent} from "../home/home.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {FieldComponent} from "../form/field/field.component";

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroEditComponent /*e*/, HeroProfileComponent , MessagesComponent, AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent, HeroDetailComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [TodoService, {provide: APP_BASE_HREF, useValue : '/' }]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
