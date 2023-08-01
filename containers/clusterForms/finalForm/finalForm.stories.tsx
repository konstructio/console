import React from 'react';
import { Story } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import FinalForm, { ClusterConfig } from '.';

export default {
  title: 'Forms/FinalForm',
  component: FinalForm,
};

const DefaultTemplate: Story = (args) => {
  const methods = useForm<ClusterConfig>();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => console.log('the form values =>', values))}
        style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <FinalForm {...args} />
        <button>Submit me</button>
      </form>
    </FormProvider>
  );
};

export const Default = DefaultTemplate.bind({});
