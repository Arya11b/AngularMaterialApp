import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProfileComponent } from './hero-profile.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {AppComponent} from "../app.component";
import {MenuComponent} from "../menu/menu.component";
import {FieldComponent} from "../form/field/field.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {MessagesComponent} from "../messages/messages.component";
import {HomeComponent} from "../home/home.component";
import {HeroesComponent} from "../heroes/heroes.component";

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroProfileComponent , HeroEditComponent, HeroProfileComponent , AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent , MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
