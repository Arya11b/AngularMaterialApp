/**
 * Created by Arya on 7/30/2018.
 */
export class FieldBase<T> {
  value: T;
  label: string;
  placeHolder: string;
  icon: string;
  order: number;
  key: string;
  controlType: string;
  validators: any[];
  errorMessages: any[];


  constructor(options: {
    value?: T,
    label?: string,
    placeHolder?: string,
    icon?: string
    order?: number,
    key?: string,
    controlType?: string,
    validators?: any[],
    errorMessages?: any[],
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeHolder = options.placeHolder;
    this.icon = options.icon;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validators = options.validators || [];
    this.errorMessages = options.errorMessages || [];
  }
}
