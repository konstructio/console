import React, { FunctionComponent } from 'react';

import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import AuthForm from '../shared/authForm';
import ClusterRunning from '../shared/clusterRunning';
import SetupForm from '../shared/setupForm';

const CIVO_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: SetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
};

export const CivoFormFlow: FunctionComponent<{ currentStep: FormStep }> = ({ currentStep }) => {
  const ActiveFormStep = CIVO_FORM_FLOW[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};
