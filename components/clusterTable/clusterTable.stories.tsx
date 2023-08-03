import React from 'react';
import { Story } from '@storybook/react';

import { ClusterTable, ClusterInfo } from './clusterTable';

export default {
  title: 'Components/ClusterTable',
  component: ClusterTable,
};

const rows: ClusterInfo[] = [
  {
    name: 'kuberfirst-mgmt2',
    nodeType: 'management',
    cloud: 'aws',
    region: 'ap-southeast-1',
    nodes: 2,
    created: '05 Apr 2023, 12:24:56',
    createdBy: 'Eleanor Carroll',
    status: 'available',
  },
  {
    name: 'kuberfirst-mgmt2',
    nodeType: 'management',
    cloud: 'civo',
    region: 'ap-southeast-1',
    nodes: 2,
    created: '05 Apr 2023, 12:24:56',
    createdBy: 'Eleanor Carroll',
    status: 'unavailable',
  },
  {
    name: 'kuberfirst-mgmt2',
    nodeType: 'management',
    cloud: 'digitalOcean',
    region: 'ap-southeast-1',
    nodes: 2,
    created: '05 Apr 2023, 12:24:56',
    createdBy: 'Eleanor Carroll',
    status: 'deleting',
  },
  {
    name: 'kuberfirst-mgmt2',
    nodeType: 'worker',
    cloud: 'digitalOcean',
    region: 'ap-southeast-1',
    nodes: 2,
    created: '05 Apr 2023, 12:24:56',
    createdBy: 'Eleanor Carroll',
    status: 'available',
  },
  {
    name: 'kuberfirst-mgmt2',
    nodeType: 'worker',
    cloud: 'vultr',
    region: 'ap-southeast-1',
    nodes: 2,
    created: '05 Apr 2023, 12:24:56',
    createdBy: 'Eleanor Carroll',
    status: 'available',
  },
];

const DefaultTemplate: Story = (args) => <ClusterTable rows={rows} {...args} />;

export const Default = DefaultTemplate.bind({});
