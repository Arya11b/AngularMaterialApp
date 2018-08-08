import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {MessagesComponent} from './messages/messages.component';
import {HomeComponent} from './home/home.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {FormComponent} from "./form/form.component";
import {HeroEditComponent} from "./hero-edit/hero-edit.component";
import {lang} from "../resources/lang";
import {HeroProfileComponent} from "./hero-profile/hero-profile.component";


const routes: Routes = [
  {path: 'messages', component: MessagesComponent},
  {path: 'hero', component: HeroDetailComponent},
  {path: 'hero/:id', component: HeroProfileComponent},
  {path: 'hero/:id/edit', component: HeroEditComponent},
  // {path: 'hero/**' , redirectTo: 'hero'},
  {path: '', component: HomeComponent },
  {path: '**', redirectTo: ''},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
