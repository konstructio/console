import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EyeIcon from '../../assets/eye.svg';

import Input from './index';

export default {
  title: 'Layout/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Layout = styled.div`
  align-items: center;
  background-color: rgb(250, 250, 250);
  display: flex;
  padding: 20px;
  height: 80px;
  width: 100%;

  > div {
    width: 400px;
  }
`;

const Template: ComponentStory<typeof Input> = (args) => (
  <Layout>
    <Input {...args} />
  </Layout>
);

const IconTemplate: ComponentStory<typeof Input> = (args) => (
  <Layout>
    <Input {...args} icon={EyeIcon} />
  </Layout>
);

export const Basic = Template.bind({});
Basic.args = {
  type: 'input',
};

export const WithIcon = IconTemplate.bind({});
Basic.args = {
  type: 'input',
};
