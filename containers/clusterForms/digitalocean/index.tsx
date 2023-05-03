import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import ClusterRunningMessage from '../../../components/clusterReady';
import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import { InstallValues } from '../../../types/redux';
import AuthForm from '../shared/authForm';

import DigitalOceanSetupForm from './setupForm';

const DIGITAL_OCEAN_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: DigitalOceanSetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunningMessage,
};

export const DigitalOceanFormFlow: FunctionComponent<FormFlowProps<InstallValues>> = ({
  currentStep,
  ...rest
}) => {
  const ActiveFormStep = DIGITAL_OCEAN_FORM_FLOW[currentStep as FormStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep {...rest} currentStep={currentStep} />;
};
