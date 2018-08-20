import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FieldBase} from '../../form/models/FieldBase';
import {OrmService} from "../../services/orm.service";
import {FieldService} from "../../services/field.service";

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
  constructor(private service: OrmService, private fieldService: FieldService) {
  }
  cityForms: FormGroup[] = [];

  ngOnInit() {
    this.initCityForm();
  }

  private initCityForm() {
    this.cityForms = [];
    this.addToForm();
  }

  protected getFieldOptionsBasedOnProvince(field, form) {
    switch (field.key) {
      case 'province':
        return field.options;
      case 'city':
        return this.service.getCitiesByProvince(form.value.province);
    }
  }

  protected get cityFields() {
    this.fieldService.getProvinces();
    this.fieldService.getCities();
    return this.fieldService.cityFields;
  }

  protected clickAdd(): void {
    this.addToForm();
  }

  protected clickRemove(form): void {
    this.removeForm(form, this.cityForms);
  }
  private addToForm() {
    this.cityForms.push(new FormGroup({}));
    this.cityForms.forEach(
      form => {
        this.cityFields.forEach(
          (field) => {
            form.addControl(field.key, new FormControl('', field.validators));
          }
        );
      });
  }
  private removeForm(form: any, forms: any[]) {
    forms.splice(forms.indexOf(form), 1);
  }
  protected hideAdd(): boolean {
    if (this.formsAreInvalid())
      return true;
    this.cityForms.forEach(
      form => {
        if (form.invalid) return true;
      }
    );
    return false;
  }
  protected hideRemove(): boolean {
    if (this.cityForms.length == 1)
      return true;
    return false;
  }
  private formsAreInvalid(): boolean {
    let bool = false;
    this.cityForms.forEach(form => {
        if (form.invalid) bool = true;
      }
    );
    return bool;
  }
  public getFormDatas(): {city: string, province: string}[] {
    let result = [];
    this.cityForms.forEach(form =>{
      result.push({city: form.value.city, province: form.value.province});
    });
    return result;
  }

}
