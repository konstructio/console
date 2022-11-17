import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PasswordComponent from './index';

export default {
  title: 'Layout/Input',
  component: PasswordComponent,
} as ComponentMeta<typeof PasswordComponent>;

const Layout = styled.div`
  align-items: center;
  background-color: rgb(250, 250, 250);
  display: flex;
  padding: 20px;
  height: 80px;
  width: 100%;

  & div {
    width: 400px;
  }
`;

const Template: ComponentStory<typeof PasswordComponent> = (args) => (
  <Layout>
    <PasswordComponent {...args} />
  </Layout>
);

export const Password = Template.bind({});
Password.args = {
  value: 'this is a big password tho',
  canCopyValue: true,
};
