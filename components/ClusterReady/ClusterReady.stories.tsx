import { Meta, StoryObj } from '@storybook/react';

import ClusterReady from './ClusterReady';

const meta: Meta<typeof ClusterReady> = {
  component: ClusterReady,
};

export default meta;

export const Default: StoryObj<typeof ClusterReady> = {
  args: {
    kbotPassword: 'feedkray',
    cloudProvider: 'aws',
    clusterName: 'kubefirst-pro',
    domainName: 'konstruct.io',
  },
};
