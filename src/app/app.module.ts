import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {HttpClientModule} from '@angular/common/http';
import {HeroService} from './hero.service';
import { FormComponent } from './form/form.component';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { FieldComponent } from './form/field/field.component';
import {FieldService} from "./field.service";
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HomeComponent,
    MenuComponent,
    ToolbarComponent,
    FormComponent,
    HeroEditComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    FormComponent
  ],
  providers: [HeroService,
  FieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
