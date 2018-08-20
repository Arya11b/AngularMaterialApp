import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Address} from "../../Models/Address";
import {FieldService} from "../../services/field.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForms: FormGroup[];
  constructor(private fieldService: FieldService) { }

  ngOnInit() {
    this.initAddressForm();
  }
  initAddressForm() {
    this.addressForms = [];
    this.addToForm();
  }

  get addressFields() {
    return this.fieldService.addressFields;
  }


  protected clickAdd(): void {
    this.addToForm();
  }

  protected clickRemove(form): void {
    this.removeForm(form, this.addressForms);
  }

  private addToForm() {
    this.addressForms.push(new FormGroup({}));
    this.addressForms.forEach(
      form => {
        this.addressFields.forEach(
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
    this.addressForms.forEach(
      form => {
        if (form.invalid) return true;
      }
    );
    return false;
  }

  protected hideRemove(): boolean {
    if (this.addressForms.length == 1)
      return true;
    return false;
  }

  public formsAreInvalid(): boolean {
    let bool = false;
    this.addressForms.forEach(form => {
        if (form.invalid) bool = true;
      }
    );
    return bool;
  }

  public getFormDatas(): Address[] {
    let result = [];
    this.addressForms.forEach(form => {
      result.push({
        id: 0,
      parentId: 0,
      place: form.value.addressPlace,
      addressLoc: form.value.addressLoc,
    });
    });
    return result;
  }

}
