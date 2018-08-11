import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';
import {APP_BASE_HREF} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../shared/material.module";
import {AppRoutingModule} from "../app-routing.module";
import {MessagesComponent} from "../messages/messages.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HomeComponent} from "../home/home.component";
import {HeroTodoComponent} from "../hero-todo/hero-todo.component";
import {SignFormComponent} from "../sign-form/sign-form.component";

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateComponent , MessagesComponent , HeroDetailComponent , HeroProfileComponent , HeroEditComponent , SignFormComponent , HeroTodoComponent , HomeComponent   ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
