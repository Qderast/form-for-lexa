import React, { FC } from 'react';
import { CommonFieldProps, FieldTypes } from '../mocs/types';
import ModuleRenderer from './Renderer';
import { useCustomForm } from '../context';

interface MainFormWrapperProps {
  data: CommonFieldProps<FieldTypes>[];
}
const MainFormWrapper: FC<MainFormWrapperProps> = ({ data }) => {
  const customFormContext = useCustomForm();

  console.log(customFormContext?.value, data, 'customFormContext.value');

  return (
    <>
      <div>{/* default form .... */}</div>
      <ModuleRenderer data={data} />
    </>
  );
};

export default MainFormWrapper;
