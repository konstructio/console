import React, { FunctionComponent } from 'react';

import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import { InstallValues } from '../../../types/redux';
import { FormFlowProps } from '../../../types/provision';
import AuthForm from '../shared/authForm';
import ClusterRunning from '../shared/clusterRunning';

import AwsSetupForm from './setupForm';

const AWS_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: AwsSetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
};

export const AwsFormFlow: FunctionComponent<FormFlowProps<InstallValues>> = ({
  currentStep,
  ...rest
}) => {
  const ActiveFormStep = AWS_FORM_FLOW[currentStep as FormStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep {...rest} currentStep={currentStep} />;
};
