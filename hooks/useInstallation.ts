import { GitProvider } from 'types';

import { InstallationType } from '../types/redux';

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

function getStepTitles(installType: InstallationType) {
  if (installType === InstallationType.LOCAL) {
    return ['Select platform', 'Set up cluster', 'Preparing', 'Ready'];
  }
  return ['Select platform', 'Readiness check', 'Set up cluster', 'Preparing', 'Ready'];
}

export function useInstallation(type: InstallationType, gitProvider: GitProvider) {
  return {
    stepTitles: getStepTitles(type),
    installTitles: getInstallationTitles(type, gitProvider),
  };
}
