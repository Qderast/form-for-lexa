import React, { ChangeEvent, FC, memo, useEffect } from 'react';
import { CommonFieldProps, FieldTypes } from '../mocs/types';
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useController,
  useForm,
} from 'react-hook-form';
import { useCustomForm } from '../context';

interface ModuleRendererProps {
  data: CommonFieldProps<FieldTypes>[];
}

export interface FormFieldProps<FV extends FieldValues> {
  name: any;
  control: ControllerProps<FV>['control'];
  data: CommonFieldProps<FieldTypes>;
  defaultValue?: ControllerProps<FV>['defaultValue'];
}

const Module = <FV extends FieldValues>({
  name,
  control,
  data,
}: FormFieldProps<FV>) => {
  const {
    field: { value, onChange },
  } = useController({
    name: name,
    control,
  });

  const returnCurrentContent = () => {
    switch (data.type) {
      case FieldTypes.Checkbox:
        return (
          <>
            {(data as CommonFieldProps<FieldTypes.Checkbox>).values.map(
              (item) => (
                <div>
                  <input
                    type="radio"
                    name={data.fieldName}
                    value={item}
                    className="border border-neutral-600 p-2"
                    onChange={onChange}
                    id={item}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ),
            )}
          </>
        );
      case FieldTypes.Input:
        return (
          <input
            type="text"
            className="border border-neutral-600 p-2"
            value={value}
            onChange={onChange}
          />
        );
      case FieldTypes.MultiChoice:
        return (
          <>
            {(data as CommonFieldProps<FieldTypes.Checkbox>).values.map(
              (item) => {
                const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
                  const returnCurrentNewArr = () => {
                    if (value === true || !Array.isArray(value)) {
                      return [e.target.value];
                    }
                    if ((value as string[]).includes(item)) {
                      const newValues = [...value];
                      newValues.splice(newValues.indexOf(item), 1);
                      return newValues;
                    }
                    if (!(value as string[]).includes(item)) {
                      return [...value, e.target.value];
                    }
                  };

                  onChange(returnCurrentNewArr());
                };
                return (
                  <div>
                    <input
                      type="checkbox"
                      name={data.fieldName}
                      className="border border-neutral-600 p-2"
                      checked={
                        Array.isArray(value)
                          ? (value as string[]).includes(item)
                          : false
                      }
                      onChange={handleOnChange}
                      value={item}
                      id={item}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                );
              },
            )}
          </>
        );
      case FieldTypes.Dropdown:
        return (
          <select
            onChange={onChange}
            className="border border-neutral-400 p-2"
            defaultValue={
              (data as CommonFieldProps<FieldTypes.Dropdown>).values[0]
            }>
            {(data as CommonFieldProps<FieldTypes.Dropdown>).values.map(
              (item) => (
                <option value={item}>{item}</option>
              ),
            )}
          </select>
        );
      case FieldTypes.Textarea:
        return <textarea onChange={onChange}></textarea>;
    }
  };

  return (
    <div className="mb-4">
      <div className="text-xl">{data.fieldName}</div>
      {data.description ? (
        <div className="text-sm">{data.description}</div>
      ) : undefined}
      {returnCurrentContent()}
    </div>
  );
};

const ModuleRenderer: FC<ModuleRendererProps> = ({ data }) => {
  const { control, watch } = useForm<CommonFieldProps<FieldTypes>>();

  const customFormContext = useCustomForm();
  const watchAllFields = watch();
  useEffect(() => {
    if (customFormContext) {
      const currentValues = customFormContext.value;
      if (JSON.stringify(currentValues) !== JSON.stringify(watchAllFields)) {
        customFormContext.setValue(watchAllFields);
      }
    }
  }, [watchAllFields, customFormContext]);

  return (
    <form>
      {data.map((item) => (
        <Module<CommonFieldProps<typeof item.type>>
          data={item}
          control={control}
          name={item.fieldName}
        />
      ))}
    </form>
  );
};

export default memo(ModuleRenderer);
