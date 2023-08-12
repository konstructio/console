import React, { FunctionComponent } from 'react';

import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import AuthForm from '../shared/authForm';
import ClusterRunning from '../shared/clusterRunning';
import SetupForm from '../shared/setupForm';

const DIGITAL_OCEAN_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: SetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
};

export const DigitalOceanFormFlow: FunctionComponent<{ currentStep: FormStep }> = ({
  currentStep,
}) => {
  const ActiveFormStep = DIGITAL_OCEAN_FORM_FLOW[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};
