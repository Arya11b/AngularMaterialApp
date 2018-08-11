import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFormComponent } from './sign-form.component';
import {APP_BASE_HREF} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../shared/material.module';
import {AppRoutingModule} from '../app-routing.module';
import {MessagesComponent} from '../messages/messages.component';
import {HeroTodoComponent} from '../hero-todo/hero-todo.component';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HeroProfileComponent} from '../hero-profile/hero-profile.component';
import {HeroEditComponent} from '../hero-edit/hero-edit.component';
import {HomeComponent} from '../home/home.component';
import {FieldService} from '../services/field.service';
import {Hero} from '../Models/Hero';
import {Address} from '../Models/Address';
import {Phone} from '../Models/Phone';
import {MatDialogModule, MatDialogRef} from "@angular/material";

describe('SignFormComponent', () => {
  let component: SignFormComponent;
  let fixture: ComponentFixture<SignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignFormComponent, MessagesComponent , HeroTodoComponent , HeroDetailComponent , HeroProfileComponent , HeroEditComponent , HomeComponent  ],
      imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule , MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ { provide: MatDialogRef, useValue: {} },FieldService, {provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('submitting a form emits a user', () => {
    expect(component.heroForm.valid).toBeFalsy();
    component.heroForm.controls['firstName'].setValue('bruce');
    component.heroForm.controls['lastName'].setValue('wayne');
    component.heroForm.controls['alias'].setValue('batman');
    expect(component.heroForm.valid).toBeTruthy();
    expect(component.phoneForms[0].valid).toBeFalsy();
    component.phoneForms[0].controls['phoneCode'].setValue('312');
    component.phoneForms[0].controls['phoneNumber'].setValue('431555');
    component.phoneForms[0].controls['phonePlace'].setValue('home');
    expect(component.phoneForms[0].valid).toBeTruthy();
    expect(component.addressForms[0].valid).toBeFalsy();
    component.addressForms[0].controls['addressPlace'].setValue('home');
    component.addressForms[0].controls['addressLoc'].setValue('stanton island');
    expect(component.addressForms[0].valid).toBeTruthy();
    component.save();

    let hero: Hero;
    let phones: Phone[];
    let addresses: Address[];
    // Subscribe to the Observable and store the user in a local variable.
    hero = component.getHeroById(component.hero.id);
    phones = component.getPhoneByParentId(component.hero.id);
    addresses = component.getAddressByParentId(component.hero.id);

    // Trigger the login function

    // Now we can check to make sure the emitted value is correct
    expect(hero.firstName).toBe('bruce');
    expect(hero.lastName).toBe('wayne');
    expect(hero.alias).toBe('batman');
    expect(phones[0].place).toBe('home');
    expect(phones[0].code).toBe('312');
    expect(phones[0].number).toBe('431555');
    expect(addresses[0].place).toBe('home');
    expect(addresses[0].addressLoc).toBe('stanton island');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
