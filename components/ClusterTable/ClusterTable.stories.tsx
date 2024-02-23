import { Meta, StoryObj } from '@storybook/react';

import { ClusterTable } from './ClusterTable';

import { noop } from '@/utils/noop';
import { mapClusterFromRaw } from '@/utils/mapClustersFromRaw';
import { mockClusterResponse } from '@/tests/mocks/mockClusterResponse';

const { managementCluster } = mapClusterFromRaw(mockClusterResponse);

const meta: Meta<typeof ClusterTable> = {
  component: ClusterTable,
};

export default meta;

export const Default: StoryObj<typeof ClusterTable> = {
  args: {
    onDeleteCluster: noop,
    managementCluster,
  },
};
