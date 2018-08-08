import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {lang} from "../../resources/lang";
import {LanguageService} from "../services/language.service";
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MessagesComponent>, private languageService: LanguageService) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  doAction() {
    this.dialogRef.close('yes')
  }
  get deleteMsgText() {
    return lang[this.languageService.getLang()].deleteMsg;
  }

}
