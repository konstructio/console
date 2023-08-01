import React, { useState } from 'react';
import { Story } from '@storybook/react';

import NumberInput from '.';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

const inputMinimum = 0;

const DefaultTemplate: Story = (args) => {
  const [value, setValue] = useState(inputMinimum);
  return (
    <NumberInput
      label="Number of nodes"
      onIncrease={() => setValue((curVal) => curVal + 1)}
      onDecrease={() => setValue((curVal) => (curVal === inputMinimum ? curVal : curVal - 1))}
      inputProps={{
        min: 0,
        value,
        type: 'number',
        required: true,
      }}
      style={{ margin: '50px auto' }}
    />
  );
};

export const Default = DefaultTemplate.bind({});
