import React, { ChangeEvent, useState } from 'react';
import Constructor from './Constructor';
import { CommonFieldProps, FieldTypes } from '../mocs/types';
import MainFormWrapper from './MainFormWrapper';
import CustomFormProvider from '../hoc/CustomFormProvider';

interface Form {
  name: string;
  fields: CommonFieldProps<FieldTypes>[];
}

const FormConstrustor = () => {
  const [form, setForm] = useState<Form>({ name: '', fields: [] });
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [goToCreatedForm, setGoToCreatedForm] = useState(false);
  const [formName, setFormName] = useState('');

  const handleStartCreateNewField = () => {
    setShowCreateForm(true);
  };

  const handleCreateNewField = (data: CommonFieldProps<FieldTypes>) => {
    setShowCreateForm(false);
    setForm({
      name: formName,
      fields: [
        ...form.fields,
        data.values
          ? {
              ...data,
              values: data.values,
            }
          : data,
      ],
    });
  };

  const handleCancelCreation = () => {
    setShowCreateForm(false);
  };

  const handleGoToCreatedForm = () => {
    setGoToCreatedForm((prevState) => !prevState);
  };

  const handleChangeFormName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };

  return (
    <div className="w-full h-svh justify-center items-center flex flex-col px-40">
      <button
        onClick={handleGoToCreatedForm}
        className="border border-neutral-500 mb-8">
        {goToCreatedForm ? 'Go to creation' : 'Go to created form'}
      </button>
      {goToCreatedForm ? (
        <div>
          <CustomFormProvider>
            <MainFormWrapper data={form.fields} />
          </CustomFormProvider>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-start items-start mb-10 w-full">
            <div className="mb-8 w-full flex">Basic details</div>
            <div className="flex justify-between w-full">
              <div>Form name *</div>
              <input
                className="border border-neutral-600"
                type="text"
                value={formName}
                onChange={handleChangeFormName}
              />
            </div>
          </div>
          <div className="mb-10 w-full flex-col">
            {form.fields.map((item) => (
              <div className="py-4 px-2 mb-2 border border-neutral-300">
                {item.fieldName}
              </div>
            ))}
          </div>
          <div className="w-full">
            <div className="flex w-full justify-between mb-6">
              <div>Form fields</div>
              <button onClick={handleStartCreateNewField}>
                + New form field
              </button>
            </div>
            {showCreateForm ? (
              <Constructor
                setNewField={handleCreateNewField}
                cancelCreation={handleCancelCreation}
              />
            ) : undefined}
          </div>
        </>
      )}
    </div>
  );
};

export default FormConstrustor;
