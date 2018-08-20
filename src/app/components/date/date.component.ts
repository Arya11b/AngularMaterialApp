import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as jMoment from 'moment-jalaali';
import {default as _rollupMoment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
const moment = _rollupMoment || _moment ;
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class DateComponent implements OnInit{
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  date: FormControl = new FormControl();
  cal = moment();
  ngOnInit() {
    // this.persianCalInit();
    // moment().locale('fa');
    // console.log(this.cal.locale());
    this.date = new FormControl(this.cal);
  }
  persianCalInit() {
    // moment.defineLocale('fa', {parentLocale: 'en'});
    // moment().transform('-0621--22--02 00:00:00.000');
    moment.updateLocale('en', {months: this.getPersianMonths(), monthsShort: this.getPersianMonthAbbr(),
      weekdays: this.getPersianWeeks(), weekdaysMin: this.getPersianWeekdaysMin(), });
  }
  getPersianMonths(): string[]{
    return ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    // return ['Farvardin','Ordibehesht','khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'];
  }
  getPersianWeeks(): string[]{
    return ['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه'];
    // return ['shanbe','yekshanbe','doshanbe','seshanbe','chaharshanbe','panjshanber','jome'];
  }
  getPersianMonthAbbr(): string[]{
    // return ['Farvardin','Ordibehesht','khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'];
    return ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  }
  getPersianWeekdaysMin(): string[]{
    return ['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه'];
  }
}
// showShamsiCalender();
// isShamsiCalender();

