import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {AppRoutingModule} from '../app-routing.module';
import {MaterialModule} from '../shared/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {MessagesComponent} from '../messages/messages.component';
import {HeroEditComponent} from '../hero-edit/hero-edit.component';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {HomeComponent} from '../home/home.component';
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuComponent, HeroProfileComponent , MessagesComponent , HeroEditComponent, HeroDetailComponent, HomeComponent],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
