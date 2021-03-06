import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';
import {MessagesComponent} from "../../messages/messages.component";
import {HeroDetailComponent} from "../../hero-detail/hero-detail.component";
import {HeroProfileComponent} from "../../hero-profile/hero-profile.component";
import {HeroEditComponent} from "../../hero-edit/hero-edit.component";
import {SignFormComponent} from "../../sign-form/sign-form.component";
import {HeroTodoComponent} from "../../hero-todo/hero-todo.component";
import {HomeComponent} from "../../home/home.component";
import {AppRoutingModule} from "../../app-routing.module";
import {MaterialModule} from "../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldComponent , MessagesComponent , HeroDetailComponent , HeroProfileComponent , HeroEditComponent , SignFormComponent , HeroTodoComponent , HomeComponent   ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
