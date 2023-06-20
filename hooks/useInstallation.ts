import { FunctionComponent, useMemo } from 'react';

import { FormStep, LocalFormStep } from '../constants/installation';
import { GitProvider } from '../types';
import { AuthKeys, InstallValues, InstallationInfo, InstallationType } from '../types/redux';
import { CivoFormFlow } from '../containers/clusterForms/civo';
import { AwsFormFlow } from '../containers/clusterForms/aws';
import { LocalFormFlow } from '../containers/clusterForms/k3d';
import { DigitalOceanFormFlow } from '../containers/clusterForms/digitalocean';
import { VultrFormFlow } from '../containers/clusterForms/vultr';
import { FormFlowProps } from '../types/provision';

export const FormFlowByType: Record<
  InstallationType,
  FunctionComponent<FormFlowProps<InstallValues>>
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
      0: `First, select your preferred Git provider`,
      1: `Let’s configure your local cluster`,
      2: `Grab a cup of tea or coffee while we set up your cluster...`,
      3: 'You’re all set!',
    };
  }
  return {
    0: `First, select your preferred Git provider`,
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
          'Establish a public hosted zone with dns routing established(<a href="https://docs.aws.amazon.com/route53/" target="_blank">docs</a>).',
          'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
        ],
        ctaDescription: 'Learn more',
        ctaLink: 'https://docs.aws.amazon.com',
      },
    },
    [InstallationType.CIVO]: {
      [FormStep.AUTHENTICATION]: {
        title: 'Civo Prerequisites',
        description: [
          '<a href="https://dashboard.civo.com/signup" target="_blank">Create a Civo account</a> in which you are an account owner.',
          'Establish a publicly routable DNS. <a href="https://www.civo.com/learn/configure-dns#adding-a-domain-name" target="_blank">Learn more</a>',
        ],
      },
    },

    [InstallationType.DIGITAL_OCEAN]: {
      [FormStep.AUTHENTICATION]: {
        title: 'DigitalOcean Prerequisites',
        description: [
          'Create a <a href="https://cloud.digitalocean.com/registrations/new" target="_blank">DigitalOcean account</a>.',
          'Add your <a href="https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/" target="_blank">domain name</a>.',
          'Create a personal <a href="https://docs.digitalocean.com/reference/api/create-personal-access-token" target="_blank">access token</a>.',
        ],
      },
    },

    [InstallationType.VULTR]: {
      [FormStep.AUTHENTICATION]: {
        title: 'Vultr Prerequisites',
        description: [
          'Create a <a href="https://www.vultr.com/register/" target="_blank">Vultr account</a>.',
          'Add your <a href="https://my.vultr.com/dns/" target="_blank">domain name</a>.',
          'Get your personal <a href="https://my.vultr.com/settings/#settingsapi" target="_blank">access token</a>.',
        ],
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

const getIsAuthStep = (type: InstallationType, step: FormStep | LocalFormStep) => {
  return type !== InstallationType.LOCAL && step === FormStep.AUTHENTICATION;
};

const getIsSetupStep = (type: InstallationType, step: FormStep | LocalFormStep) => {
  const isLocalSetupStep = type === InstallationType.LOCAL && step === LocalFormStep.SETUP;
  const isSetupStep = type !== InstallationType.LOCAL && step === FormStep.SETUP;

  return isLocalSetupStep || isSetupStep;
};

const getIsProvisionStep = (type: InstallationType, step: FormStep | LocalFormStep) => {
  const isLocalProvisionStep =
    type === InstallationType.LOCAL && step === LocalFormStep.PROVISIONING;
  const isProvisionStep = type !== InstallationType.LOCAL && step === FormStep.PROVISIONING;

  return isLocalProvisionStep || isProvisionStep;
};

const getApiKeyInfo = (type: InstallationType) => {
  const apiKeyInfo: Record<InstallationType, AuthKeys | null> = {
    [InstallationType.LOCAL]: null,
    [InstallationType.AWS]: {
      authKey: 'aws_auth',
      fieldKeys: [
        {
          name: 'access_key_id',
          label: 'AWS access key id',
          helperText:
            'Create an access key ID by navigating to Users on the AWS console and opening the Security credentials tab.',
        },
        {
          name: 'secret_access_key',
          label: 'AWS Secret access key',
          helperText:
            'Create a secret access key by navigating to Users on the AWS console and opening the Security credentials tab.',
        },
        {
          name: 'session_token',
          label: 'AWS session token',
          helperText: 'Use the AWS CLI tool and the command “aws sts get-session-token”.',
        },
      ],
    },
    [InstallationType.CIVO]: {
      authKey: 'civo_auth',
      fieldKeys: [
        {
          name: 'token',
          label: 'CIVO API key',
          helperText:
            'Retrieve your key at <a href="https://dashboard.civo.com/security" target="_blank">https://dashboard.civo.com/security</a>',
        },
      ],
    },
    [InstallationType.DIGITAL_OCEAN]: {
      authKey: 'do_auth',
      fieldKeys: [
        {
          name: 'token',
          label: 'DigitalOcean authentication token',
          helperText:
            'Create your token by following the instructions at <a href="https://cloud.digitalocean.com/account/api" target="_blank">https://cloud.digitalocean.com/account/api</a>',
        },
        {
          name: 'spaces_key',
          label: 'DigitalOcean spaces key',
          helperText:
            'From the DigitalOcean control panel, click API. Navigate to the Spaces Keys tab, select Generate New Key.',
        },
        {
          name: 'spaces_secret',
          label: 'DigitalOcean spaces secret',
          helperText:
            'Click API on the control panel and retrieve the spaces secret from the Spaces Key tab.',
        },
      ],
    },
    [InstallationType.VULTR]: {
      authKey: 'vultr_auth',
      fieldKeys: [
        {
          name: 'token',
          label: 'Vultr API key',
          helperText:
            'Retrieve your key at <a href="https://my.vultr.com/settings/#settingsapi" target="_blank">https://my.vultr.com/settings/#settingsapi</a>',
        },
      ],
    },
  };

  return apiKeyInfo[type];
};

export function useInstallation(type: InstallationType, gitProvider: GitProvider, step: number) {
  const formByType = useMemo(() => {
    return FormFlowByType[type];
  }, [type]);

  return {
    stepTitles: getStepTitles(type),
    installTitles: getInstallationTitles(type, gitProvider),
    info: getInfoByType(type, step),
    isAuthStep: getIsAuthStep(type, step),
    isSetupStep: getIsSetupStep(type, step),
    isProvisionStep: getIsProvisionStep(type, step),
    formFlow: formByType as FunctionComponent<FormFlowProps<InstallValues>>,
    apiKeyInfo: getApiKeyInfo(type),
  };
}
