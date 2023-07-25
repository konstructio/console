import React from 'react';
import { ComponentStory } from '@storybook/react';

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

const DefaultTemplate: ComponentStory<typeof InstallationButtons> = (args) => {
  return <InstallationButtons onBackButtonClick={noop} {...args} />;
};

export const Default = DefaultTemplate.bind({});
