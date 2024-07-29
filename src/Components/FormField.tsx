import React, { ChangeEvent } from 'react';
import { ControllerProps, FieldValues, useController } from 'react-hook-form';
import { fieldTypes } from '../mocs/data';

export interface FormFieldProps<FV extends FieldValues> {
  name: ControllerProps<FV>['name'];
  control: ControllerProps<FV>['control'];
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'values';
  title: string;
  defaultValue?: ControllerProps<FV>['defaultValue'];
  placeholder?: string;
}

const CreateFormField = <FV extends FieldValues>({
  name,
  control,
  type,
  title,
  defaultValue,
  placeholder,
}: FormFieldProps<FV>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const returnCurrentField = () => {
    switch (type) {
      case 'input':
        return (
          <input
            type="text"
            className="border border-neutral-600 p-2"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            name=""
            className="border border-neutral-600 p-2"
            value={value}
            placeholder={placeholder}
            onChange={onChange}>
            {value}
          </textarea>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            className="border border-neutral-600 p-2"
            value={value}
            onChange={onChange}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={onChange}
            className="border border-neutral-600 p-2">
            {fieldTypes.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        );
      case 'values':
        return (
          <div>
            {(value as string[]).map((item, index) => {
              const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
                const newArray = [...value];
                newArray.splice(index, 1, e.target.value);
                onChange(newArray);
              };

              const handleDeleteItem = () => {
                const newArray = [...value];
                newArray.splice(index, 1);
                onChange(newArray);
              };
              return (
                <div className="mb-2">
                  <input
                    type="text"
                    value={item}
                    placeholder="Field value"
                    onChange={handleChangeValue}
                    className="border border-neutral-600 p-2 mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteItem}
                    className="border border-neutral-600 p-2">
                    Musorka
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="text-blue-700 p-2"
              onClick={() => {
                onChange([...value, '']);
              }}>
              + Add answer option
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex w-full justify-between mb-4">
      <div>{title}</div>
      {returnCurrentField()}
    </div>
  );
};

export default CreateFormField;
