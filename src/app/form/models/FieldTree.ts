/**
 * Created by Arya on 8/11/2018.
 */
import {FieldBase} from './FieldBase';

export class FieldTree extends FieldBase<string> {
  controlType = 'tree';
  options: any = {};
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || '';
  }
}
