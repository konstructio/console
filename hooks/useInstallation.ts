import { FunctionComponent, useMemo } from 'react';

import {
  CivoMarketpalceFormStep,
  DEFAULT_STEPS,
  FormStep,
  INFO_INSTALLATION_TYPES,
  INSTALLATION_TYPE_API_KEYS,
  INSTALL_TYPE_STEPS,
  LOCAL_INSTALL_TITLES,
  LocalFormStep,
} from '../constants/installation';
import { GitProvider } from '../types';
import { InstallValues, InstallationType } from '../types/redux';
import { CivoFormFlow } from '../containers/clusterForms/civo';
import { CivoMarketplaceFormFlow } from '../containers/clusterForms/civo/marketplace';
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
  [InstallationType.CIVO_MARKETPLACE]: CivoMarketplaceFormFlow,
  [InstallationType.DIGITAL_OCEAN]: DigitalOceanFormFlow,
  [InstallationType.VULTR]: VultrFormFlow,
};

const getInstallationTitles = (
  installType: InstallationType,
  gitProvider: GitProvider,
): Record<number, string> => {
  if (installType === InstallationType.LOCAL) {
    return LOCAL_INSTALL_TITLES;
  } else if (installType === InstallationType.CIVO_MARKETPLACE) {
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

const getInfoByType = (installType: InstallationType, step: number) => {
  const infoByCloud = INFO_INSTALLATION_TYPES[installType];

  return infoByCloud && infoByCloud[step];
};

const getStepTitles = (installType: InstallationType) => {
  return INSTALL_TYPE_STEPS[installType] || DEFAULT_STEPS;
};

const getIsAuthStep = (
  type: InstallationType,
  step: FormStep | LocalFormStep | CivoMarketpalceFormStep,
) => {
  return (
    (![InstallationType.LOCAL, InstallationType.CIVO_MARKETPLACE].includes(type) &&
      step === FormStep.AUTHENTICATION) ||
    (type === InstallationType.CIVO_MARKETPLACE && step === CivoMarketpalceFormStep.AUTHENTICATION)
  );
};

const getIsSetupStep = (
  type: InstallationType,
  step: FormStep | LocalFormStep | CivoMarketpalceFormStep,
) => {
  const isLocalSetupStep = type === InstallationType.LOCAL && step === LocalFormStep.SETUP;

  const isSetupStep =
    ![InstallationType.LOCAL, InstallationType.CIVO_MARKETPLACE].includes(type) &&
    step === FormStep.SETUP;

  const isCivoMarketplaceSetup =
    type === InstallationType.CIVO_MARKETPLACE && step === CivoMarketpalceFormStep.SETUP;

  return isLocalSetupStep || isSetupStep || isCivoMarketplaceSetup;
};

const getIsProvisionStep = (
  type: InstallationType,
  step: FormStep | LocalFormStep | CivoMarketpalceFormStep,
) => {
  const isLocalProvisionStep =
    type === InstallationType.LOCAL && step === LocalFormStep.PROVISIONING;

  const isProvisionStep =
    ![InstallationType.CIVO_MARKETPLACE, InstallationType.LOCAL].includes(type) &&
    step === FormStep.PROVISIONING;

  const isCivoMarketplaceProvisionStep =
    type === InstallationType.CIVO_MARKETPLACE && step === CivoMarketpalceFormStep.PROVISIONING;

  return isLocalProvisionStep || isProvisionStep || isCivoMarketplaceProvisionStep;
};

export function useInstallation(type: InstallationType, gitProvider: GitProvider, step: number) {
  const formByType = useMemo(() => {
    return FormFlowByType[type] || FormFlowByType.aws;
  }, [type]);

  return {
    stepTitles: getStepTitles(type),
    installTitles: getInstallationTitles(type, gitProvider),
    info: getInfoByType(type, step),
    isAuthStep: getIsAuthStep(type, step),
    isSetupStep: getIsSetupStep(type, step),
    isProvisionStep: getIsProvisionStep(type, step),
    formFlow: formByType as FunctionComponent<FormFlowProps<InstallValues>>,
    apiKeyInfo: INSTALLATION_TYPE_API_KEYS[type],
  };
}
