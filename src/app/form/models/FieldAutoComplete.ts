/**
 * Created by Arya on 7/30/2018.
 */
import {FieldBase} from './FieldBase';

export class FieldAutoComplete extends FieldBase<string> {
  controlType = 'autocomplete';
  options: string[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || '';
  }
}

