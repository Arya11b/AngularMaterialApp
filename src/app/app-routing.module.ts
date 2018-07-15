import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {MessagesComponent} from './messages/messages.component';


const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'messages', component: MessagesComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
