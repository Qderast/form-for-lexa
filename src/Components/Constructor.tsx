import React, { FC } from 'react';
import { CommonFieldProps, FieldTypes } from '../mocs/types';
import { useForm, useWatch } from 'react-hook-form';
import CreateFormField from './FormField';

interface ConstructorProps {
  setNewField: (data: CommonFieldProps<FieldTypes>) => void;
  cancelCreation: () => void;
}

const Constructor: FC<ConstructorProps> = ({ setNewField, cancelCreation }) => {
  const { handleSubmit, control } = useForm<CommonFieldProps<FieldTypes>>();

  const choosenType: FieldTypes = useWatch({
    control,
    name: 'type',
  });

  return (
    <form onSubmit={handleSubmit(setNewField)}>
      <CreateFormField<CommonFieldProps<FieldTypes>>
        title="Field name *"
        name="fieldName"
        control={control}
        type="input"
      />

      <CreateFormField<CommonFieldProps<FieldTypes>>
        title="Description (optional)"
        name="description"
        control={control}
        type="textarea"
      />

      <CreateFormField<CommonFieldProps<FieldTypes>>
        title="Field type"
        name="type"
        defaultValue={FieldTypes.Input}
        control={control}
        type="select"
      />
      {choosenType === FieldTypes.Dropdown ||
      choosenType === FieldTypes.MultiChoice ||
      choosenType === FieldTypes.Checkbox ? (
        <CreateFormField<CommonFieldProps<FieldTypes>>
          title="Field values"
          name="values"
          control={control}
          type="values"
          defaultValue={['', '']}
        />
      ) : undefined}

      <CreateFormField<CommonFieldProps<FieldTypes>>
        title="Required"
        name="required"
        control={control}
        type="checkbox"
      />

      <button type="submit" className="border border-neutral-600 mr-2 p-2">
        Save form field
      </button>
      <button
        onClick={cancelCreation}
        className="border border-neutral-600 p-2">
        Cancel
      </button>
    </form>
  );
};

export default Constructor;
