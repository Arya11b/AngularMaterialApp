import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TreeChecklistComponent} from "../../components/tree-checklist/tree-checklist.component";
import {FieldService} from "../../services/field.service";
import {SuperPowersList} from "../../Models/SuperPowersList";
import {OrmService} from "../../services/orm.service";
import {FieldBase} from "../models/FieldBase";

@Component({
  selector: 'app-tree-field',
  templateUrl: './tree-field.component.html',
  styleUrls: ['./tree-field.component.scss']
})
export class TreeFieldComponent implements OnInit {
  @ViewChild('tree') treeChecklist: TreeChecklistComponent;
  spForm: FormGroup;
  field: FieldBase<any>;
  // temp for n level to be removed in latter releases
  sampleData = {
    a: ['1','2','3'],
    b: {
      h: {
        g: {
          h: ['3','6','9']
        }
      }
    }
  };
  isOn = false;
  toggleButton() {
    this.isOn = !this.isOn;
  }

  constructor(private fieldService: FieldService, private orm: OrmService) { }
  ngOnInit() {
    this.field = this.getSpField();
    this.initSpForm();
  }
  getSelectedData() {
    return this.treeChecklist.getSelectedData();
  }
  initSpForm() {
    this.spForm = new FormGroup({});
    this.spForm.addControl(this.field.key, new FormControl('', this.field.validators));
  }



  getSpField() {
    this.fieldService.getSuperPowerOptions();
    return this.fieldService.superpowerField;
  }

  public formIsInvalid(): boolean {
    return this.spForm.invalid;
  }
  public getFormSpData(): SuperPowersList[] {
    let result = [];
    this.getSelectedData().forEach(superpower => {
      result.push({id: 0, superPowerId: this.orm.getSuperPowerId(superpower), parentId: 0});
    });
    return result;
  }

}
