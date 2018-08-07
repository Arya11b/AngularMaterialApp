import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {MenuComponent} from "./menu/menu.component";
import {MatMenu, MatSidenav, MatToolbar} from "@angular/material";
import {HeroesComponent} from "./heroes/heroes.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AppRoutingModule} from "./app-routing.module";
import {MessagesComponent} from "./messages/messages.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {HeroEditComponent} from "./hero-edit/hero-edit.component";
import {HomeComponent} from "./home/home.component";
import {MaterialModule} from "./shared/material.module";
import {FormComponent} from "./form/form.component";
import {FieldComponent} from "./form/field/field.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          // MatSidenav, MatToolbar,
          declarations: [AppComponent , MenuComponent, FormComponent, FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HeroEditComponent, HomeComponent ],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
