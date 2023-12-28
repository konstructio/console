import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer } from './createRepository.styled';

import ControlledTextField from '@/components/controlledFields/TextField';
import { Repository } from '@/types/repository';

interface CreateRepositoryFormProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  defaultValues?: Repository;
}

const CreateRepositoryForm: FunctionComponent<CreateRepositoryFormProps> = ({ defaultValues }) => {
  const { control } = useFormContext<Repository>();

  return (
    <FormContainer>
      <ControlledTextField
        control={control}
        defaultValue={defaultValues?.name}
        name="name"
        label="Name"
        rules={{
          required: 'Name is required',
        }}
        required
      />
    </FormContainer>
  );
};

export default CreateRepositoryForm;
