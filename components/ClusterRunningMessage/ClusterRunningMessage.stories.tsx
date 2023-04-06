import React from 'react';
import { Story } from '@storybook/react';

import boxImageSrc from '../../public/static/box.svg';

import ClusterRunningMessage from './ClusterRunningMessage';

export default {
  title: 'Components/ClusterRunningMessage',
  component: ClusterRunningMessage,
};

const DefaultTemplate: Story = () => <ClusterRunningMessage imageSrc={boxImageSrc} />;

export const Default = DefaultTemplate.bind({});
