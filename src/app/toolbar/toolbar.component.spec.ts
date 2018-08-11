import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {APP_BASE_HREF} from "@angular/common";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MessagesComponent} from "../messages/messages.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {HomeComponent} from "../home/home.component";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarComponent, HeroProfileComponent ,MessagesComponent,HeroDetailComponent, HeroEditComponent,HomeComponent],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
