import { GitProvider } from 'types';

import { InstallationInfo, InstallationType } from '../types/redux';

function getInstallationTitles(
  installType: InstallationType,
  gitProvider: GitProvider,
): Record<number, string> {
  if (installType === InstallationType.LOCAL) {
    return {
      1: `Let’s configure your local cluster`,
      2: `Grab a cup of tea or coffee while we set up your cluster...`,
      3: 'You’re all set!',
    };
  }
  return {
    1: `Now, test your hosted zone name is accessible`,
    2: `Let’s configure your ${installType} - ${gitProvider} cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  };
}

function getInfoByType(installType: InstallationType) {
  const infoByInstallType: Record<InstallationType, InstallationInfo> = {
    [InstallationType.LOCAL]: {
      title: 'Tip',
      description: `Once you’re ready to start your Cloud version you can delete your local cluster by running:`,
      code: 'kubefirst k3d destroy',
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
    [InstallationType.AWS]: {
      title: 'AWS Prerequisites',
      description: [
        'Create an AWS account with billing enabled.',
        'Establish a public hosted zone with dns routing established(docs).',
        'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
      ],
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
    [InstallationType.CIVO]: {
      title: 'Civo Prerequisites',
      description: [
        'Create an Civo account in which you are an account owner.',
        'Establish a publicly routable DNS.',
      ],
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
    [InstallationType.DIGITAL_OCEAN]: {
      title: 'Civo Prerequisites',
      description: [
        'Create an Civo account in which you are an account owner.',
        'Establish a publicly routable DNS.',
      ],
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
    [InstallationType.VULTR]: {
      title: 'Civo Prerequisites',
      description: [
        'Create an Civo account in which you are an account owner.',
        'Establish a publicly routable DNS.',
      ],
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
  };

  return infoByInstallType[installType];
}

function getStepTitles(installType: InstallationType) {
  if (installType === InstallationType.LOCAL) {
    return ['Select platform', 'Cluster Details', 'Provisioning', 'Ready'];
  }
  return ['Select platform', 'Authentication', 'Cluster Details', 'Provisioning', 'Ready'];
}

export function useInstallation(type: InstallationType, gitProvider: GitProvider) {
  return {
    stepTitles: getStepTitles(type),
    installTitles: getInstallationTitles(type, gitProvider),
    info: getInfoByType(type),
  };
}
