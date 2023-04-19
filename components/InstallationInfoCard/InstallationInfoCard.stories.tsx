import React from 'react';
import { Story } from '@storybook/react';

import { useInstallation } from '../../hooks/useInstallation';
import { InstallationType } from '../../types/redux';

import InstallationInfoCard from './InstallationInfoCard';

export default {
  title: 'Components/InstallationInfoCard',
  component: InstallationInfoCard,
};

const DefaultTemplate: Story = () => {
  const { info } = useInstallation(InstallationType.LOCAL);
  return <InstallationInfoCard info={info} />;
};

export const Default = DefaultTemplate.bind({});
