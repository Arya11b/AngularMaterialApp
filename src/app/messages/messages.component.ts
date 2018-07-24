import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MessagesComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  doAction() {
    this.dialogRef.close('yes')
  }

}
