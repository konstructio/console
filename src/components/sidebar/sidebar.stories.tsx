import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Sidebar from './index';

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Sidebar>;

const Layout = styled.div`
  border: 1px solid lightgray;
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  height: 792px;
  width: 1440px;
`;

const Content = styled.div``;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Layout>
    <Sidebar {...args} />
    <Content />
  </Layout>
);

export const Basic = Template.bind({});
Basic.args = {
  onSidebarItemClick: action('onSidebarItemClick'),
};
