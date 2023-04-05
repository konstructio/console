import { InstallationType } from '../types/redux';
import { CardOptionInfo } from '../types';

export const AWS_REGIONS = [
  { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2' },
  { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1' },
  { label: 'US West (N. California) (us-west-1)', value: 'us-west-1' },
  { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2' },
];

export const DOCS_LINK = 'https://docs.kubefirst.io';

export const ANALYTICS_ID = '0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M';

export const EMAIL_REGEX = /.+@.+\..+/;

export const DOMAIN_REGEX = new RegExp(/[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}/);

export const INSTALLATION_CARD_OPTIONS: Record<InstallationType, CardOptionInfo> = {
  [InstallationType.LOCAL]: {
    description: 'Explore all you can do with Kubefirst with no costs by running locally.',
    title: 'Run Locally',
  },
  [InstallationType.AWS_GITHUB]: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitHub',
  },
  [InstallationType.AWS_GITLAB]: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitLab',
  },
  [InstallationType.CIVO_GITHUB]: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'Civo with Github',
  },
  [InstallationType.CIVO_GITLAB]: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'Civo with Gitlab',
  },
};
