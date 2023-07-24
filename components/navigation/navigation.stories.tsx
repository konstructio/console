import React from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from './index';

export default {
  title: 'Layout/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 60px);
`;

const DefaultTemplate: ComponentStory<typeof Navigation> = (args) => (
  <Wrapper>
    <Navigation {...args} />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  domLoaded: true,
  handleIsActiveItem: () => true,
  handleOpenContent: noop,
  handleOpenGame: noop,
  isProvisionStep: false,
  kubefirstVersion: 'v1.0.0',
  routes: [],
};
