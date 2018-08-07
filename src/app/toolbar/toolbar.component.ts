import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormComponent} from "../form/form.component";
import {lang} from "../../resources/lang";

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
    let dialogRef = this.dialog.open(FormComponent, {width: '450px'});
  }
}
