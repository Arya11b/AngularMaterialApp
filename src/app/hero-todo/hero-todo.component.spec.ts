import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTodoComponent } from './hero-todo.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {MessagesComponent} from "../messages/messages.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HomeComponent} from "../home/home.component";
import {FieldService} from "../services/field.service";

describe('HeroTodoComponent', () => {
  let component: HeroTodoComponent;
  let fixture: ComponentFixture<HeroTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroTodoComponent, MessagesComponent , HomeComponent , HeroDetailComponent , HeroProfileComponent , HeroEditComponent   ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FieldService , {provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
