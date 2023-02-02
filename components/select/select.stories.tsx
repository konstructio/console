import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectComponent from './index';

export default {
  title: 'Form Elements/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

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

const DefaultTemplate: ComponentStory<typeof SelectComponent> = () => (
  <Wrapper>
    <SelectComponent label="Default" placeholder="Select" required options={OPTIONS} />
  </Wrapper>
);
export const Default = DefaultTemplate.bind({});
