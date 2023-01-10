import { useMemo, useState } from 'react';

import LocalForms from '../containers/clusterForms/local';

export enum InstallationTypes {
  LOCAL = 1,
  AWS_GITHUB = 2,
  AWS_GITLAB = 3,
}

export const titleBySteps: { [key: number]: { [key: number]: string } } = {
  [InstallationTypes.LOCAL]: {
    1: `Let’s configure your local cluster`,
    2: `Grab a cup of tea or coffee while we set up your cluster...`,
    3: 'You’re all set!',
  },
  [InstallationTypes.AWS_GITHUB]: {
    1: `Now, test your hosted zone name is accessible`,
    2: `Let’s configure your local cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
  [InstallationTypes.AWS_GITLAB]: {
    1: `Now, test your hosted zone name is accessible`,
    2: `Let’s configure your local cluster`,
    3: `Grab a cup of tea or coffee while we set up your cluster...`,
    4: 'You’re all set!',
  },
};

const InstallationSteps = {
  [InstallationTypes.LOCAL]: ['Select platform', 'Set up cluster', 'Preparing', 'Ready'],
  [InstallationTypes.AWS_GITHUB]: [
    'Select platform',
    'Readiness check',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
  [InstallationTypes.AWS_GITLAB]: [
    'Select platform',
    'Readiness check',
    'Set up cluster',
    'Preparing',
    'Ready',
  ],
};

const InstallationInfoByType: {
  [key: string]: {
    title: string;
    description: string | Array<string>;
    code?: string;
    ctaDescription: string;
    ctaLink: string;
  };
} = {
  [InstallationTypes.LOCAL]: {
    title: 'Running Kubefirst locally',
    description: `Once you’re ready to start your Cloud version you can simply delete your local cluster by running the following command:`,
    code: 'kubefirst cluster destroy',
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationTypes.AWS_GITHUB]: {
    title: 'AWS Prerequisites',
    description: [
      'Create an AWS account with billing enabled.',
      'Establish a public hosted zone with dns routing established(docs).',
      'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
  [InstallationTypes.AWS_GITLAB]: {
    title: 'AWS Prerequisites',
    description: [
      'Create an AWS account with billing enabled.',
      'Establish a public hosted zone with dns routing established(docs).',
      'Connect with AdministratorAccess IAM credentials to your AWS account (docs).',
    ],
    ctaDescription: 'Learn more',
    ctaLink: '',
  },
};

const FormFlowByType = {
  [InstallationTypes.LOCAL]: LocalForms,
  [InstallationTypes.AWS_GITHUB]: LocalForms,
  [InstallationTypes.AWS_GITLAB]: LocalForms,
};

export default function useInstallation(type: InstallationTypes = InstallationTypes.LOCAL) {
  const [installationType, setInstallationType] = useState(type);
  const [info, setInfo] = useState(InstallationInfoByType[type]);
  const [steps, setSteps] = useState<Array<string>>(InstallationSteps[type]);

  const FormFlowComponent = useMemo(() => FormFlowByType[type], [type]);

  const onChangeInstallationType = (type: InstallationTypes) => {
    setInstallationType(type);
    setSteps(InstallationSteps[type]);
    setInfo(InstallationInfoByType[type]);
  };

  return {
    installationType,
    onChangeInstallationType,
    steps,
    info,
    FormFlowComponent,
  };
}
