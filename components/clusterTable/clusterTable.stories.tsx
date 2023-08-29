import { Meta, StoryObj } from '@storybook/react';

import { noop } from '../../utils/noop';
import { mapClusterFromRaw } from '../../utils/mapClustersFromRaw';
import { mockClusterResponse } from '../../tests/mocks/mockClusterResponse';

import { ClusterTable } from './clusterTable';

const managementCluster = mapClusterFromRaw(mockClusterResponse);

const meta: Meta<typeof ClusterTable> = {
  component: ClusterTable,
};

export default meta;

export const Default: StoryObj<typeof ClusterTable> = {
  args: {
    onMenuOpenClose: noop,
    onDeleteCluster: noop,
    managementCluster,
  },
};
