import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme =  new EventEmitter<void>();
  @Output() toggleRtl =  new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    let dialogRef = this.dialog.open(FormComponent, {width: '450px'});
  }
}
