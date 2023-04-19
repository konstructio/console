import { InstallationType } from '../types/redux';

export type InstallationInfo = {
  title: string;
  description: string | string[];
  code?: string;
  ctaDescription: string;
  ctaLink?: string;
};

export const installationTitles: Record<InstallationType, { [key: number]: string }> = {
  [InstallationType.LOCAL]: {
    1: `Let’s configure your local cluster`,
    2: `Grab a cup of tea or coffee while we set up your cluster...`,
    3: 'You’re all set!',
  },
  [InstallationType.AWS_GITHUB]: {
    1: `Now, test your hosted zone name is accessible`,
    2: `Let’s configure your AWS - GitHub cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
  [InstallationType.AWS_GITLAB]: {
    1: `Now, test your hosted zone name is accessible`,
    2: `Let’s configure your AWS - GitLab cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
  [InstallationType.CIVO_GITHUB]: {
    1: `Now, test your hosted domain name is accessible`,
    2: `Let’s configure your Civo - GitHub cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
  [InstallationType.CIVO_GITLAB]: {
    1: `Now, test your hosted domain name is accessible`,
    2: `Let’s configure your Civo - Gitlab cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
};

const stepTitles: Record<InstallationType, string[]> = {
  [InstallationType.LOCAL]: ['Select platform', 'Set up cluster', 'Preparing', 'Ready'],
  [InstallationType.AWS_GITHUB]: [
    'Select platform',
    'Readiness check',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
  [InstallationType.AWS_GITLAB]: [
    'Select platform',
    'Readiness check',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
  [InstallationType.CIVO_GITHUB]: [
    'Select platform',
    'Authenticate',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
  [InstallationType.CIVO_GITLAB]: [
    'Select platform',
    'Readiness check',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
};

const infoByInstallType: Record<InstallationType, InstallationInfo> = {
  [InstallationType.LOCAL]: {
    title: 'Running Kubefirst locally',
    description: `Once you’re ready to start your Cloud version you can simply delete your local cluster by running the following command:`,
    code: 'kubefirst cluster destroy',
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationType.AWS_GITHUB]: {
    title: 'AWS Prerequisites',
    description: [
      'Create an AWS account with billing enabled.',
      'Establish a public hosted zone with dns routing established(docs).',
      'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationType.AWS_GITLAB]: {
    title: 'AWS Prerequisites',
    description: [
      'Create an AWS account with billing enabled.',
      'Establish a public hosted zone with dns routing established(docs).',
      'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationType.CIVO_GITHUB]: {
    title: 'Civo Prerequisites',
    description: [
      'Create an Civo account in which you are an account owner.',
      'Establish a publicly routable DNS.',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationType.CIVO_GITLAB]: {
    title: 'Civo Prerequisites',
    description: [
      'Create an Civo account in which you are an account owner.',
      'Establish a publicly routable DNS.',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
};

export function useInstallation(type: InstallationType) {
  return {
    stepTitles: stepTitles[type],
    installTitles: installationTitles[type],
    info: infoByInstallType[type],
  };
}
