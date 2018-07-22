import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Superhero Phonebook App';
  constructor(iconRegistery: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistery.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));

  }
}
