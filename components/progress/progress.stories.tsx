import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import theme from '../../theme';

import ProgressComponent from './index';

const {
  colors: { americanGreen, danger, yellowOrange },
} = theme;

export default {
  title: 'Components/Progresss',
  component: ProgressComponent,
} as ComponentMeta<typeof ProgressComponent>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Template: ComponentStory<typeof ProgressComponent> = () => (
  <Wrapper>
    <ProgressComponent label="Sync Status" color={americanGreen} progress={100} />
    <ProgressComponent label="Sync Status" color={yellowOrange} progress={50} />
    <ProgressComponent label="Sync Status" color={danger} progress={10} />
  </Wrapper>
);

export const Progress = Template.bind({});
