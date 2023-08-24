import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import Radio from './';

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;

const RadioWithHooks = () => {
  const { control } = useForm({
    defaultValues: {
      gender: 'male',
    },
  });

  return (
    <Radio
      control={control}
      rules={{ required: false }}
      name="gender"
      options={[
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ]}
    />
  );
};

export const Default: StoryObj<typeof Radio> = {
  render: () => <RadioWithHooks />,
};
