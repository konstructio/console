import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import { InstallValues } from '../../../types/redux';
import AuthForm from '../shared/authForm';
import ClusterRunning from '../shared/clusterRunning';

import DigitalOceanSetupForm from './setupForm';

const DIGITAL_OCEAN_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: DigitalOceanSetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
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
