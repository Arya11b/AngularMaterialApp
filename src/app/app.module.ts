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
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
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
    AutocompleteComponent,
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
    SignFormComponent
  ],
  providers: [HeroService,
  FieldService, MenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
