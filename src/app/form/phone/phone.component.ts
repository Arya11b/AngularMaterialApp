import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Phone} from "../../Models/Phone";
import {FieldService} from "../../services/field.service";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  phoneForms: FormGroup[];

  initPhoneForm() {
    this.phoneForms = [];
    this.addToForm();
  }

  constructor(private fieldService: FieldService) {
  }

  ngOnInit() {
    this.initPhoneForm();
  }

  get phoneFields() {
    return this.fieldService.phoneFields;
  }

  protected clickAdd(): void {
    this.addToForm();
  }

  protected clickRemove(form): void {
    this.removeForm(form, this.phoneForms);
  }

  private addToForm() {
    this.phoneForms.push(new FormGroup({}));
    this.phoneForms.forEach(
      form => {
        this.phoneFields.forEach(
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
    this.phoneForms.forEach(
      form => {
        if (form.invalid) return true;
      }
    );
    return false;
  }

  protected hideRemove(): boolean {
    if (this.phoneForms.length == 1)
      return true;
    return false;
  }

  public formsAreInvalid(): boolean {
    let bool = false;
    this.phoneForms.forEach(form => {
        if (form.invalid) bool = true;
      }
    );
    return bool;
  }

  public getFormDatas(): Phone[] {
    let result = [];
    this.phoneForms.forEach(form => {
      result.push({id: 0, parentId: 0, number: form.value.phoneNumber, code: form.value.phoneCode, place: form.value.phonePlace});
    });
    return result;
  }
}
