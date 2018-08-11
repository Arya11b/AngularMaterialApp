/**
 * Created by Arya on 8/11/2018.
 */
import {FieldBase} from './FieldBase';

export class FieldDate extends FieldBase<string> {
  controlType = 'date';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    console.log('type' + this.type);
  }
}
