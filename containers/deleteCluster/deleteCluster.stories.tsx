import React, { FunctionComponent, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/button';
import { noop } from '../../utils/noop';
import { Cluster, ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';

import DeleteCluster, { DeleteClusterProps } from './';

const meta: Meta<typeof DeleteCluster> = {
  title: 'Components/DeleteCluster',
  component: DeleteCluster,
};

export default meta;

const clusters: Cluster[] = [
  {
    id: '1',
    clusterName: 'kuberfirst-mgmt',
    type: ClusterType.MANAGEMENT,
    cloudProvider: InstallationType.AWS,
    cloudRegion: 'ap-southeast-1',
    creationDate: '05 Apr 2023, 12:24:56',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
    dnsProvider: 'civo',
    nodeCount: 2,
    gitAuth: {
      gitOwner: 'D-B-Hawk',
      gitToken: 'secret',
      gitUser: 'D-B-Hawk',
    },
  },
  {
    id: '2',
    clusterName: 'kuberfirst-worker-1',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.CIVO,
    cloudRegion: 'ap-southeast-1',
    creationDate: '05 Apr 2023, 12:24:56',
    status: ClusterStatus.ERROR,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
    dnsProvider: 'civo',
    nodeCount: 2,
    gitAuth: {
      gitOwner: 'D-B-Hawk',
      gitToken: 'secret',
      gitUser: 'D-B-Hawk',
    },
  },
];

const DeleteClusterWithHooks: FunctionComponent<DeleteClusterProps> = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <DeleteCluster {...props} isOpen={open} onClose={() => setOpen(false)} onDelete={noop} />
      <Button variant="contained" color="primary" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'}
      </Button>
    </>
  );
};

type Story = StoryObj<typeof DeleteCluster>;

export const Management: Story = {
  render: (args) => <DeleteClusterWithHooks {...args} cluster={clusters[0]} />,
};

export const Worker: Story = {
  render: (args) => <DeleteClusterWithHooks {...args} cluster={clusters[1]} />,
};
