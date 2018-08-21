import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
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
import {HeroService} from './services/hero.service';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { FieldComponent } from './form/field/field.component';
import {FieldService} from "./services/field.service";
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { HeroTodoComponent } from './hero-todo/hero-todo.component';
import { SignFormComponent } from './sign-form/sign-form.component';
import { DateComponent } from './components/date/date.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { DropdownComponent } from './components/dropdown-multiple/dropdown-multiple.component';
import { ProvinceComponent } from './form/province/province.component';
import {DpDatePickerModule} from "ng2-jalali-date-picker";
import { PhoneComponent } from './form/phone/phone.component';
import { AddressComponent } from './form/address/address.component';
import { HeroComponent } from './form/hero/hero.component';
import { TreeChecklistComponent } from './components/tree-checklist/tree-checklist.component';
import { TreeFieldComponent } from './form/tree-field/tree-field.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HomeComponent,
    MenuComponent,
    ToolbarComponent,
    HeroEditComponent,
    FieldComponent,
    HeroProfileComponent,
    HeroTodoComponent,
    SignFormComponent,
    DateComponent,
    TextFieldComponent,
    DropdownComponent,
    ProvinceComponent,
    PhoneComponent,
    AddressComponent,
    HeroComponent,
    TreeChecklistComponent,
    TreeFieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DpDatePickerModule
  ],
  entryComponents: [
    SignFormComponent
  ],
  providers: [HeroService,
  FieldService, MenuComponent,
    ProvinceComponent,
    {provide: LOCALE_ID, useValue: 'fa-IR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
