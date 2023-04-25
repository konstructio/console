import React from 'react';
import { Story } from '@storybook/react';

import ClusterRunningMessage from '.';

export default {
  title: 'Components/ClusterRunningMessage',
  component: ClusterRunningMessage,
};

const DefaultTemplate: Story = () => <ClusterRunningMessage />;

export const Default = DefaultTemplate.bind({});
