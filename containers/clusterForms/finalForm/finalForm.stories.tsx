import React, { useRef } from 'react';
import { Story } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import FinalForm, { ClusterConfig } from '.';

export default {
  title: 'Forms/FinalForm',
  component: FinalForm,
};

const DefaultTemplate: Story = () => {
  const methods = useForm<ClusterConfig>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <FormProvider {...methods}>
      <FinalForm
        ref={formRef}
        onFinalFormSubmit={(config) => console.log('the form values =>', config)}
      />
      <button onClick={handleClick}>Submit me</button>
    </FormProvider>
  );
};

export const Default = DefaultTemplate.bind({});
