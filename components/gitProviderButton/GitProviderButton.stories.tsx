import React from 'react';
import { Story } from '@storybook/react';

import { GitProvider } from '../../types';

import GitProviderButton, { GitProviderButtonProps } from './GitProviderButton';

export default {
  title: 'Components/GitProviderButton',
  component: GitProviderButton,
  argTypes: {
    option: {
      control: 'select',
      options: GitProvider,
      defaultValue: GitProvider.GITHUB,
    },
    active: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

const DefaultTemplate: Story<GitProviderButtonProps> = (args) => <GitProviderButton {...args} />;

export const Default = DefaultTemplate.bind({});
