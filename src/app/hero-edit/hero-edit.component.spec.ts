import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HomeComponent} from "../home/home.component";
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

import { HeroEditComponent } from './hero-edit.component';
import {FieldService} from "../services/field.service";

describe('HeroEditComponent', () => {
    let component: HeroEditComponent;
    let fixture: ComponentFixture<HeroEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [HeroEditComponent, AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [FieldService, {provide: APP_BASE_HREF, useValue : '/' }]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
