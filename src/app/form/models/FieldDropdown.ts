/**
 * Created by Arya on 7/30/2018.
 */
import {FieldBase} from './FieldBase';

export class FieldDropdown extends FieldBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || '';
  }
}
