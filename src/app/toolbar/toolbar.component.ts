import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {MatDialog} from "@angular/material";
import {lang} from "../../resources/lang";
import {SignFormComponent} from "../sign-form/sign-form.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme =  new EventEmitter<void>();
  @Output() toggleRtl =  new EventEmitter<void>();
  @Input() lang = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    let dialogRef = this.dialog.open(SignFormComponent, {width: '450px'});
  }
}
