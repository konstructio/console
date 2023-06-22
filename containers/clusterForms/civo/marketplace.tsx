import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import ClusterRunningMessage from '../../../components/clusterReady';
import TerminalLogs from '../../terminalLogs';
import { CivoMarketpalceFormStep } from '../../../constants/installation';
import { InstallValues } from '../../../types/redux';
import AuthForm from '../shared/authForm';

import SetupForm from './setupForm';

const CIVO_MARKETPLACE_FORM_FLOW = {
  [CivoMarketpalceFormStep.AUTHENTICATION]: AuthForm,
  [CivoMarketpalceFormStep.SETUP]: SetupForm,
  [CivoMarketpalceFormStep.PROVISIONING]: TerminalLogs,
  [CivoMarketpalceFormStep.READY]: ClusterRunningMessage,
};

export const CivoMarketplaceFormFlow: FunctionComponent<FormFlowProps<InstallValues>> = ({
  currentStep,
  ...rest
}) => {
  const ActiveFormStep = CIVO_MARKETPLACE_FORM_FLOW[currentStep as CivoMarketpalceFormStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep {...rest} currentStep={currentStep} />;
};
