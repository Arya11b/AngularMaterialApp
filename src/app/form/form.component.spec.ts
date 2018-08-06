import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {MessagesComponent} from "../messages/messages.component";
import {AppComponent} from "../app.component";
import {MenuComponent} from "../menu/menu.component";
import {FieldComponent} from "./field/field.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HomeComponent} from "../home/home.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";
import {MaterialModule} from "../shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {FieldService} from "../services/field.service";
import {MatDialogRef} from "@angular/material/dialog";

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [MessagesComponent, HeroEditComponent , HomeComponent , AppComponent , MenuComponent, FormComponent, FieldComponent, ToolbarComponent, HeroesComponent, HeroDetailComponent ],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [FieldService, { provide: MatDialogRef, useValue: {} }, {provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
