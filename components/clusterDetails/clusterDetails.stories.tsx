import { Meta, StoryObj } from '@storybook/react';
import { mockClusterConfig } from 'tests/mocks/mockClusterConfig';

import ClusterDetails from '.';

const meta: Meta<typeof ClusterDetails> = {
  component: ClusterDetails,
};

export default meta;

export const Default: StoryObj<typeof ClusterDetails> = {
  args: {
    mockCluster,
  },
};
