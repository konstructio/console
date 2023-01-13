import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Terminal from './index';

export default {
  title: 'Components/Terminal',
  component: Terminal,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Terminal>;

const Layout = styled.div`
  border: 1px solid lightgray;
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  height: 792px;
`;

const Template: ComponentStory<typeof Terminal> = (args) => (
  <Layout>
    <Terminal {...args} />
  </Layout>
);

export const Basic = Template.bind({});
Basic.args = {};
