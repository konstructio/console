import { TagColor, TagIconOption } from '../components/tag';
import { ClusterStatus, ClusterType } from '../types/provision';

import { InstallationType } from '@/types/redux';

export const AWS_REGIONS = [
  { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2' },
  { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1' },
  { label: 'US West (N. California) (us-west-1)', value: 'us-west-1' },
  { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2' },
];

export const CIVO_REGIONS = [
  { label: 'New York', value: 'nyc1' },
  { label: 'Phoenix', value: 'phx1' },
  { label: 'France', value: 'fra1' },
  { label: 'London', value: 'lon1' },
];

export const DOCS_LINK = 'https://docs.kubefirst.io';

export const ANALYTICS_ID = '0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M';

export const EMAIL_REGEX = /.+@.+\..+/;

export const DOMAIN_REGEX = new RegExp(/[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}/);

export const LOWER_KEBAB_CASE_REGEX = /^[a-z0-9-]+$/g;

export const KUBEFIRST_REPOSITORIES = ['gitops', 'metaphor'];
export const KUBEFIRST_TEAMS = ['admins', 'developers'];

export const FLAPPY_TWEET = `The @kubefirst team is making kubernetes platform provisioning so much fun! Check out this Flappy K-Ray game that they let you play while your cluster provisions! https://kray.kubefirst.io

<note: add a screenshot of your high score for a chance to win a monthly prize!>`;

export const AUTHENTICATION_ERROR_MSG = `
  Please check that your cloud provider authentication inputs are correct, then click Next to retry. If the issue persists please <a href="https://kubefirst.io/slack" target="_blank">contact the kubefirst team via Slack</a>.
`;

export const CLUSTER_TAG_CONFIG: Record<
  ClusterStatus,
  { iconLabel: string; iconType?: TagIconOption; bgColor: TagColor }
> = {
  [ClusterStatus.PROVISIONED]: { iconLabel: 'Available', iconType: 'check', bgColor: 'green' },
  [ClusterStatus.PROVISIONING]: {
    iconLabel: 'Provisioning',
    iconType: 'auto-renew',
    bgColor: 'light blue',
  },
  [ClusterStatus.DELETING]: { iconLabel: 'Deleting', iconType: 'trash', bgColor: 'pink' },
  [ClusterStatus.DELETED]: { iconLabel: 'Deleted', iconType: 'trash', bgColor: 'pink' },
  [ClusterStatus.ERROR]: { iconLabel: 'Unavailable', iconType: 'warning', bgColor: 'light-orange' },
};

export const MIN_NODE_COUNT = 1;
export const SUGGESTED_WORKLOAD_NODE_COUNT = 2;

export const WORKLOAD_CLUSTER_OPTIONS = [
  { label: 'Physical', value: ClusterType.WORKLOAD },
  { label: 'Virtual', value: ClusterType.WORKLOAD_V_CLUSTER },
];

export const DEFAULT_CLOUD_INSTANCE_SIZES: Record<
  InstallationType,
  { instanceSize: string; nodeCount: number }
> = {
  [InstallationType.AWS]: { instanceSize: 'm5.large', nodeCount: 6 },
  [InstallationType.CIVO]: { instanceSize: 'Medium - Standard', nodeCount: 6 },
  [InstallationType.DIGITAL_OCEAN]: { instanceSize: 's-4vcpu-8gb', nodeCount: 4 },
  [InstallationType.GOOGLE]: { instanceSize: 'e2-medium', nodeCount: 3 },
  [InstallationType.VULTR]: { instanceSize: 'vc2-4c-8gb', nodeCount: 5 },
  [InstallationType.LOCAL]: { instanceSize: '', nodeCount: 3 },
};
