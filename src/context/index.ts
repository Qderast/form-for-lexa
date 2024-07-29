import { createContext, useContext } from 'react';
import { CommonFieldProps, FieldTypes } from '../mocs/types';

export const CustomFormContext = createContext<ICustomFormContext | null>(null);

export const { Provider: CustomFormContextProvider } = CustomFormContext;

export type ICustomFormContext = {
  setValue: (data: CommonFieldProps<FieldTypes>) => void;
  value?: CommonFieldProps<FieldTypes>;
};

export const useCustomForm = (): ICustomFormContext | null => {
  return useContext(CustomFormContext);
};
