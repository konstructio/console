import { Meta, StoryObj } from '@storybook/react';

import ClusterProReady from './ClusterProReady';

const meta: Meta<typeof ClusterProReady> = {
  component: ClusterProReady,
};

export default meta;

export const Default: StoryObj<typeof ClusterProReady> = {
  args: {
    kbotPassword: 'feedkray',
    cloudProvider: 'aws',
    clusterName: 'kubefirst-pro',
    domainName: 'konstruct.io',
  },
};
