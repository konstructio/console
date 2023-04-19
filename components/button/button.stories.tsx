import React from 'react';
import { Story } from '@storybook/react';

import Button, { IButtonProps } from './Button';

export default {
  title: 'Form Elements/Button',
  component: Button,
};

const Template: Story<IButtonProps> = (args) => <Button {...args} style={{ margin: 50 }} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'outlined',
  color: 'secondary',
  children: 'Secondary',
};
export const Danger = Template.bind({});
Danger.args = {
  variant: 'contained',
  color: 'error',
  children: 'Danger',
};
export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'contained',
  color: 'primary',
  disabled: true,
  children: 'Disabled',
};
export const DisabledSecondary = Template.bind({});
DisabledSecondary.args = {
  variant: 'outlined',
  color: 'secondary',
  disabled: true,
  children: 'Disabled',
};
