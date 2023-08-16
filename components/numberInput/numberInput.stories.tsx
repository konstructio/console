import React from 'react';
import { Story } from '@storybook/react';

import NumberInput from '.';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

const DefaultTemplate: Story = () => {
  return (
    <NumberInput
      label="Number of nodes"
      inputProps={{
        type: 'number',
        required: true,
      }}
      onChange={(value) => console.log('the value =>', value)}
    />
  );
};

export const Default = DefaultTemplate.bind({});
