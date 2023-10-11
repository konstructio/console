import React, { FunctionComponent } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { noop } from '../../utils/noop';
import { mapClusterFromRaw } from '../../utils/mapClustersFromRaw';
import { mockClusterResponse } from '../../tests/mocks/mockClusterResponse';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPresentedClusterId } from '../../redux/slices/api.slice';

import { ClusterTable } from './clusterTable';

const { managementCluster } = mapClusterFromRaw(mockClusterResponse);

const meta: Meta<typeof ClusterTable> = {
  component: ClusterTable,
};

export default meta;

const ClusterTableWithHooks: FunctionComponent = () => {
  const { presentedClusterId, managementCluster, clusterMap } = useAppSelector(({ api }) => api);

  const dispatch = useAppDispatch();

  return managementCluster ? (
    <ClusterTable
      clusters={clusterMap}
      managementCluster={managementCluster}
      presentedClusterId={presentedClusterId}
      onMenuButtonClick={(presentedClusterId) =>
        dispatch(setPresentedClusterId(presentedClusterId))
      }
      onDeleteCluster={noop}
    />
  ) : (
    <div>No management cluster</div>
  );
};

export const Default: StoryObj<typeof ClusterTable> = {
  args: {
    onDeleteCluster: noop,
    managementCluster,
  },
};

export const WithSelectableRows: StoryObj<typeof ClusterTable> = {
  render: () => <ClusterTableWithHooks />,
};
