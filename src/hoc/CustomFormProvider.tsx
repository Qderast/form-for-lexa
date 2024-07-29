import React, { useState, FC, PropsWithChildren } from 'react';
import { ICustomFormContext, CustomFormContextProvider } from '../context';
import { CommonFieldProps, FieldTypes } from '../mocs/types';

const CustomFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formValue, setFormValue] = useState<
    CommonFieldProps<FieldTypes> | undefined
  >();

  const form: ICustomFormContext = {
    setValue: (data: CommonFieldProps<FieldTypes>) => setFormValue(data),
    value: formValue,
  };

  return (
    <CustomFormContextProvider value={form}>
      {children}
    </CustomFormContextProvider>
  );
};

export default CustomFormProvider;
