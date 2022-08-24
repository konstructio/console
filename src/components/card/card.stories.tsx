import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './index';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Template: ComponentStory<typeof Card> = () => (
  <Wrapper>
    <Card />
  </Wrapper>
);

export const Basic = Template.bind({});
