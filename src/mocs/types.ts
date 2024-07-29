export enum FieldTypes {
  Input = 'input',
  Checkbox = 'checkbox',
  Textarea = 'textarea',
  MultiChoice = 'multichoice',
  Dropdown = 'dropdown',
}

type Values<T extends FieldTypes> = T extends
  | FieldTypes.Checkbox
  | FieldTypes.Dropdown
  | FieldTypes.MultiChoice
  ? string[]
  : undefined;

export interface CommonFieldProps<T extends FieldTypes> {
  fieldName: string;
  description: string;
  type: T;
  values: Values<T>;
  required: boolean;
}
