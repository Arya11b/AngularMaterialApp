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
import {HeroEditComponent} from "../hero-edit/hero-edit.component";
import {MatDialogRef} from "@angular/material";
import {HeroProfileComponent} from "../hero-profile/hero-profile.component";

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [MessagesComponent, HeroProfileComponent , HeroEditComponent, AppComponent , MenuComponent, FieldComponent, ToolbarComponent, HeroesComponent, MessagesComponent, HeroDetailComponent, HomeComponent ],
          imports: [AppRoutingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [{ provide: MatDialogRef, useValue: {} } , {provide: APP_BASE_HREF, useValue : '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
