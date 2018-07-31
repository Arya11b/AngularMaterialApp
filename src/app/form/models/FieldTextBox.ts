/**
 * Created by Arya on 7/30/2018.
 */
import {FieldBase} from "./FieldBase";

export class FieldTextBox extends FieldBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
