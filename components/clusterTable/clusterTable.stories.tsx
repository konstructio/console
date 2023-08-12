import React from 'react';
import { Story } from '@storybook/react';

import { ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';

import { ClusterTable, ClusterInfo } from './clusterTable';

export default {
  title: 'Components/ClusterTable',
  component: ClusterTable,
};

const clusters: ClusterInfo[] = [
  {
    clusterName: 'kuberfirst-mgmt2',
    type: ClusterType.MANAGEMENT,
    cloudProvider: InstallationType.AWS,
    cloudRegion: 'ap-southeast-1',
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
    nodes: 2,
  },
  {
    clusterName: 'kuberfirst-mgmt2',
    type: ClusterType.MANAGEMENT,
    cloudProvider: InstallationType.CIVO,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.ERROR,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-mgmt2',
    type: ClusterType.MANAGEMENT,
    cloudProvider: InstallationType.DIGITAL_OCEAN,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.DELETING,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-mgmt2',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.DIGITAL_OCEAN,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
  {
    clusterName: 'kuberfirst-mgmt2',
    type: ClusterType.WORKLOAD,
    cloudProvider: InstallationType.VULTR,
    cloudRegion: 'ap-southeast-1',
    nodes: 2,
    creationDate: '05 Apr 2023, 12:24:56',
    gitUser: 'Eleanor Carroll',
    status: ClusterStatus.PROVISIONED,
    adminEmail: 'admin@mycompany.com',
    gitProvider: 'Github',
    domainName: 'yourdomain.com',
  },
];

const DefaultTemplate: Story = (args) => <ClusterTable clusters={clusters} {...args} />;

export const Default = DefaultTemplate.bind({});
