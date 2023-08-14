import React, { useRef } from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormProvider, useForm } from 'react-hook-form';

import ClusterCreationForm, { ClusterConfig } from '.';

export default {
  title: 'Forms/ClusterCreationForm',
  component: ClusterCreationForm,
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
      <ClusterCreationForm ref={formRef} onFormSubmit={() => action('onSubmit')} />
      <button onClick={handleClick}>Submit me</button>
    </FormProvider>
  );
};

export const Default = DefaultTemplate.bind({});
