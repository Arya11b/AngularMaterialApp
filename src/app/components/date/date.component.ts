import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FieldBase} from "../../form/models/FieldBase";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as jMoment from 'jalali-moment';
import {MatDatepickerModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import {Platform} from "@angular/cdk/platform";
import {JALALI_MOMENT_FORMATS} from "../../shared/jalali_moment_formats";
import {JalaliMomentDateAdapter} from "../../shared/jalali-moment-date-adapter";
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

export class JalaliDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string) {
    super(matDateLocale, new Platform());
  }
  format(date: Date, displayFormat: object): string {
    var faDate = jMoment(date.toDateString()).locale('fa').format('YYYY/MM/DD');
    return faDate;
  }
}
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS},
  ],
})
export class DateComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  date: FormControl = new FormControl();
  ngOnInit() {
  }
  public dateChange(event: any, dateInput: any,picker:any) {
    var faDate = dateInput.value;
    jMoment.locale('fa');
    var enDateMomentFormat  = jMoment(faDate).locale('en');
    var enDate = new Date(enDateMomentFormat.toLocaleString());
    picker._validSelected = enDate;
    picker.startAt = enDate;
  }

}
// showShamsiCalender();
// isShamsiCalender();

