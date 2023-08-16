import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';

import ControlledNumberInput from '.';

export default {
  title: 'Components/ControlledNumberInput',
  component: ControlledNumberInput,
};

const DefaultTemplate: Story = () => {
  const { control } = useForm({
    defaultValues: {
      numberOfNodes: 3,
    },
  });
  return (
    <form onSubmit={() => action('onSubmit')}>
      <ControlledNumberInput label="Number of nodes" name="numberOfNodes" control={control} />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Default = DefaultTemplate.bind({});
