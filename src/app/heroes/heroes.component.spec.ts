import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../shared/material.module";
import {AppRoutingModule} from "../app-routing.module";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {MessagesComponent} from "../messages/messages.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HomeComponent} from "../home/home.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroProfileComponent , MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
