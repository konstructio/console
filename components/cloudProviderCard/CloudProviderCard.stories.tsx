import React from 'react';
import { Story } from '@storybook/react';

import { InstallationType } from '../../types/redux';

import CloudProviderCard, { CloudProviderCardProps } from './CloudProviderCard';

export default {
  title: 'Components/CloudProviderCard',
  component: CloudProviderCard,
  argTypes: {
    option: {
      control: 'select',
      options: InstallationType,
      defaultValue: InstallationType.LOCAL,
    },
    active: {
      control: 'boolean',
      defaultValue: false,
    },
    withHoverEffect: {
      control: 'boolean',
      defaultValue: true,
    },
  },
};

const DefaultTemplate: Story<CloudProviderCardProps> = (args) => <CloudProviderCard {...args} />;

export const Default = DefaultTemplate.bind({});
