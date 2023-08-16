import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormProvider, useForm } from 'react-hook-form';

import { NewClusterConfig } from '../../../types/provision';

import ClusterCreationForm from '.';

export default {
  title: 'Forms/ClusterCreationForm',
  component: ClusterCreationForm,
};

const DefaultTemplate: Story = () => {
  const methods = useForm<NewClusterConfig>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => action('onSubmit')}>
        <ClusterCreationForm />
        <button type="submit">Submit me</button>
      </form>
    </FormProvider>
  );
};

export const Default = DefaultTemplate.bind({});
