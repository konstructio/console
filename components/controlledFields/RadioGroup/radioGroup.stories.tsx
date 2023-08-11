import React from 'react';
import { Story } from '@storybook/react';
import { useForm } from 'react-hook-form';

import RadioGroup from '.';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

const DefaultTemplate: Story = () => {
  const { control } = useForm({
    defaultValues: {
      gender: 'male',
    },
  });

  return (
    <RadioGroup
      control={control}
      label="Gender"
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

export const Default = DefaultTemplate.bind({});
