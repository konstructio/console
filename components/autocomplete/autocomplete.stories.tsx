import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';

import AutoComplete from './index';

export default {
  title: 'Form Elements/Autocomplete',
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const OPTIONS = [
  {
    label: 'us-east-1',
    value: 'us-east-1',
  },
  {
    label: 'us-west-1',
    value: 'us-west-1',
  },
];

const DefaultTemplate: ComponentStory<typeof AutoComplete> = () => {
  const { control } = useForm();
  return (
    <Wrapper>
      <Controller
        control={control}
        name="profile"
        rules={{ required: true }}
        render={({ field }) => (
          <AutoComplete
            {...field}
            placeholder="Search"
            loading
            label="Autocomplete"
            options={OPTIONS}
          />
        )}
      />
    </Wrapper>
  );
};

export const Default = DefaultTemplate.bind({});
