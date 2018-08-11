import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldComponent } from './field.component';
import {AppComponent} from "../../app.component";
import {MenuComponent} from "../../menu/menu.component";
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {HeroesComponent} from "../../heroes/heroes.component";
import {MessagesComponent} from "../../messages/messages.component";
import {HeroDetailComponent} from "../../hero-detail/hero-detail.component";
import {HeroEditComponent} from "../../hero-edit/hero-edit.component";
import {HomeComponent} from "../../home/home.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppRoutingModule} from "../../app-routing.module";
import {MaterialModule} from "../../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {HeroProfileComponent} from "../../hero-profile/hero-profile.component";

describe('FieldComponent', () => {
    let component: FieldComponent;
    let fixture: ComponentFixture<FieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [AppComponent , MenuComponent, HeroProfileComponent , FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
