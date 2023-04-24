import React from 'react';
import { Story } from '@storybook/react';

import Card, { CardProps } from '.';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    active: {
      control: 'boolean',
      defaultValue: false,
    },
    withHoverEffect: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

const DefaultTemplate: Story<CardProps> = (args) => (
  <Card style={{ height: 100, width: 150 }} {...args} />
);

export const Default = DefaultTemplate.bind({});
