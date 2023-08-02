import React, { useState } from 'react';
import { Story } from '@storybook/react';

import NumberInput from '.';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

const inputMinimum = 0;

const DefaultTemplate: Story = () => {
  const [value, setValue] = useState(inputMinimum);
  return (
    <NumberInput
      value={value}
      min={inputMinimum}
      onIncrease={() => setValue((curVal) => curVal + 1)}
      onDecrease={() => setValue((curVal) => (curVal === inputMinimum ? curVal : curVal - 1))}
      style={{ margin: '50px auto' }}
    />
  );
};

export const Default = DefaultTemplate.bind({});
