import React, { FunctionComponent } from 'react';

import TerminalLogs from '../terminalLogs';
import { FormStep } from '../../constants/installation';

import AuthForm from './shared/authForm';
import ClusterRunning from './shared/clusterRunning';
import SetupForm from './shared/setupForm';

const FORM_FLOW_MAP = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: SetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
};

export const FormFlow: FunctionComponent<{ currentStep: FormStep }> = ({ currentStep }) => {
  const ActiveFormStep = FORM_FLOW_MAP[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};
