import { FunctionComponent, useMemo } from 'react';

import { FormStep, LocalFormStep } from '../constants/installation';
import { GitProvider } from '../types';
import { InstallValues, InstallationInfo, InstallationType } from '../types/redux';
import { CivoFormFlow } from '../containers/clusterForms/civo';
import { AwsFormFlow } from '../containers/clusterForms/aws';
import { LocalFormFlow } from '../containers/clusterForms/k3d';
import { DigitalOceanFormFlow } from '../containers/clusterForms/digitalocean';
import { VultrFormFlow } from '../containers/clusterForms/vultr';
import { FormFlowProps } from '../types/provision';

export const FormFlowByType: Record<
  InstallationType,
  FunctionComponent<FormFlowProps<InstallValues>> | null
> = {
  [InstallationType.LOCAL]: LocalFormFlow,
  [InstallationType.AWS]: AwsFormFlow,
  [InstallationType.CIVO]: CivoFormFlow,
  [InstallationType.DIGITAL_OCEAN]: DigitalOceanFormFlow,
  [InstallationType.VULTR]: VultrFormFlow,
};

const getInstallationTitles = (
  installType: InstallationType,
  gitProvider: GitProvider,
): Record<number, string> => {
  if (installType === InstallationType.LOCAL) {
    return {
      1: `Let’s configure your local cluster`,
      2: `Grab a cup of tea or coffee while we set up your cluster...`,
      3: 'You’re all set!',
    };
  }
  return {
    1: `Now, let’s get you authenticated`,
    2: `Let’s configure your ${installType} - ${gitProvider} cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  };
};

const getInfoByType = (installType: InstallationType, step: number) => {
  const infoByInstallType: Record<InstallationType, Record<number, InstallationInfo>> = {
    [InstallationType.LOCAL]: {
      [LocalFormStep.SETUP]: {
        title: 'Tip',
        description: `Once you’re ready to start your Cloud version you can delete your local cluster by running:`,
        code: 'kubefirst k3d destroy',
        ctaDescription: 'Learn more',
        ctaLink: '',
      },
    },
    [InstallationType.AWS]: {
      [FormStep.AUTHENTICATION]: {
        title: 'AWS Prerequisites',
        description: [
          'Create an AWS account with billing enabled.',
          'Establish a public hosted zone with dns routing established(docs).',
          'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
        ],
        ctaDescription: 'Learn more',
        ctaLink: '',
      },
    },
    [InstallationType.CIVO]: {
      [FormStep.AUTHENTICATION]: {
        title: 'Civo Prerequisites',
        description: [
          'Create a Civo account in which you are an account owner.',
          'Establish a publicly routable DNS.',
        ],
        ctaDescription: 'Learn more',
        ctaLink: '',
      },
    },

    [InstallationType.DIGITAL_OCEAN]: {
      [FormStep.AUTHENTICATION]: {
        title: 'DigitalOcean Prerequisites',
        description: ['TBD.', 'TBD.'],
        ctaDescription: 'Learn more',
        ctaLink: '',
      },
    },

    [InstallationType.VULTR]: {
      [FormStep.AUTHENTICATION]: {
        title: 'Vultr Prerequisites',
        description: ['TBD.', 'TBD.'],
        ctaDescription: 'Learn more',
        ctaLink: '',
      },
    },
  };

  const infoByCloud = infoByInstallType[installType];

  return infoByCloud && infoByCloud[step];
};

const getStepTitles = (installType: InstallationType) => {
  const defaultSteps = [
    'Select platform',
    'Authentication',
    'Cluster details',
    'Provisioning',
    'Ready',
  ];

  const stepsByInstallType: Record<InstallationType, Array<string>> = {
    [InstallationType.LOCAL]: ['Select platform', 'Cluster details', 'Provisioning', 'Ready'],
    [InstallationType.AWS]: defaultSteps,
    [InstallationType.CIVO]: defaultSteps,
    [InstallationType.DIGITAL_OCEAN]: defaultSteps,
    [InstallationType.VULTR]: defaultSteps,
  };

  return stepsByInstallType[installType] || defaultSteps;
};

const getIsProvisionStep = (type: InstallationType, step: FormStep | LocalFormStep) => {
  const isLocalProvisionStep = type === InstallationType.LOCAL && step === LocalFormStep.SETUP;
  const isProvisionStep = type !== InstallationType.LOCAL && step === FormStep.SETUP;

  return isLocalProvisionStep || isProvisionStep;
};

export function useInstallation(type: InstallationType, gitProvider: GitProvider, step: number) {
  const formByType = useMemo(() => {
    return FormFlowByType[type];
  }, [type]);

  return {
    stepTitles: getStepTitles(type),
    installTitles: getInstallationTitles(type, gitProvider),
    info: getInfoByType(type, step),
    isProvisionStep: getIsProvisionStep(type, step),
    formFlow: formByType as FunctionComponent<FormFlowProps<InstallValues>>,
  };
}
