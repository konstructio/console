import { useState } from 'react';

export enum InstallationTypes {
  LOCAL = 1,
  AWS_GITHUB = 2,
  AWS_GITLAB = 3,
}

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

export default function useInstallation(type: InstallationTypes = InstallationTypes.LOCAL) {
  const [installationType, setInstallationType] = useState(type);
  const [steps, setSteps] = useState<Array<string>>(InstallationSteps[type]);

  const onChangeInstallationType = (type: InstallationTypes) => {
    setInstallationType(type);
    setSteps(InstallationSteps[type]);
  };

  return {
    installationType,
    onChangeInstallationType,
    steps,
  };
}
