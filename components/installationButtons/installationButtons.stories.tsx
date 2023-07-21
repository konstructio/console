import React from 'react';
import { Story } from '@storybook/react';

import { noop } from '../../utils/noop';

import InstallationButtons from '.';

export default {
  title: 'Components/InstallationButtons',
  component: InstallationButtons,
  argTypes: {
    showBackButton: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

const DefaultTemplate: Story = (args) => {
  return <InstallationButtons onBackButtonClick={noop} {...args} />;
};

export const Default = DefaultTemplate.bind({});
