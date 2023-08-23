import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ClusterInfo } from '../clusterTable/clusterTable';
import { ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';

import ClusterDetails from '.';

const cluster: ClusterInfo = {
  clusterName: 'kuberfirst-mgmt2',
  type: ClusterType.MANAGEMENT,
  cloudProvider: InstallationType.AWS,
  cloudRegion: 'ap-southeast-1',
  creationDate: '05 Apr 2023, 12:24:56',
  adminEmail: 'admin@mycompany.com',
  gitProvider: 'Github',
  domainName: 'yourdomain.com',
  gitUser: 'Eleanor Carroll',
  status: ClusterStatus.PROVISIONED,
  nodes: 2,
  instanceSize: '8 CPU Cores / 64 GB RAM / 120 GB NvME storage / 8 TB Data Transfer',
};

const meta: Meta<typeof ClusterDetails> = {
  component: ClusterDetails,
};

export default meta;

export const Default: StoryObj<typeof ClusterDetails> = {
  args: {
    cluster,
  },
};
