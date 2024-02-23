import {
  DEFAULT_STEPS,
  FormStep,
  INFO_INSTALLATION_TYPES,
  INFO_MARKETPLACE_INSTALLATION_TYPES,
  INSTALLATION_TYPE_API_KEYS,
  INSTALL_TYPE_STEPS,
  LOCAL_INSTALL_TITLES,
  K3DFormStep,
  MARKETPLACE_STEPS,
  MarketplaceFormStep,
} from '../constants/installation';
import { GitProvider } from '../types';
import { InstallationType } from '../types/redux';

const getInstallationTitles = (
  installType: InstallationType,
  gitProvider: GitProvider,
  isMarketplace: boolean,
): Record<number, string> => {
  if (installType === InstallationType.LOCAL) {
    return LOCAL_INSTALL_TITLES;
  }

  if (isMarketplace) {
    return {
      0: `Now, let’s get you authenticated`,
      1: `Let’s configure your ${installType} - ${gitProvider} cluster`,
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

const getInfoByType = (installType: InstallationType, step: number, isMarketplace: boolean) => {
  const infoByCloud = isMarketplace
    ? INFO_MARKETPLACE_INSTALLATION_TYPES[installType]
    : INFO_INSTALLATION_TYPES[installType];

  return infoByCloud && infoByCloud[isMarketplace ? step + 1 : step];
};

const getStepTitles = (installType: InstallationType, isMarketplace: boolean) => {
  if (isMarketplace) {
    return MARKETPLACE_STEPS;
  }
  return INSTALL_TYPE_STEPS[installType] || DEFAULT_STEPS;
};

const getIsAuthStep = (
  type: InstallationType,
  step: FormStep | K3DFormStep | MarketplaceFormStep,
  isMarketplace: boolean,
) => {
  if (isMarketplace) {
    return ![InstallationType.LOCAL].includes(type) && step === MarketplaceFormStep.AUTHENTICATION;
  }

  return ![InstallationType.LOCAL].includes(type) && step === FormStep.AUTHENTICATION;
};

const getIsSetupStep = (
  type: InstallationType,
  step: FormStep | K3DFormStep | MarketplaceFormStep,
  isMarketplace: boolean,
) => {
  if (isMarketplace) {
    return ![InstallationType.LOCAL].includes(type) && step === MarketplaceFormStep.SETUP;
  }

  const isLocalSetupStep = type === InstallationType.LOCAL && step === K3DFormStep.SETUP;

  const isSetupStep = ![InstallationType.LOCAL].includes(type) && step === FormStep.SETUP;

  return isLocalSetupStep || isSetupStep;
};

const getIsProvisionStep = (
  type: InstallationType,
  step: FormStep | K3DFormStep | MarketplaceFormStep,
  isMarketplace: boolean,
) => {
  if (isMarketplace) {
    return ![InstallationType.LOCAL].includes(type) && step === MarketplaceFormStep.PROVISIONING;
  }

  const isLocalProvisionStep = type === InstallationType.LOCAL && step === K3DFormStep.PROVISIONING;

  const isProvisionStep =
    ![InstallationType.LOCAL].includes(type) && step === FormStep.PROVISIONING;

  return isLocalProvisionStep || isProvisionStep;
};

export const useInstallation = (
  type: InstallationType,
  gitProvider: GitProvider,
  step: number,
  isMarketplace = false,
) => ({
  stepTitles: getStepTitles(type, isMarketplace),
  installTitles: getInstallationTitles(type, gitProvider, isMarketplace),
  info: getInfoByType(type, step, isMarketplace),
  isAuthStep: getIsAuthStep(type, step, isMarketplace),
  isSetupStep: getIsSetupStep(type, step, isMarketplace),
  isProvisionStep: getIsProvisionStep(type, step, isMarketplace),
  apiKeyInfo: INSTALLATION_TYPE_API_KEYS[type],
});
