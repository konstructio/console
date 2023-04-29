import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import ClusterRunningMessage from '../../../components/clusterRunningMessage';
import TerminalLogs from '../../terminalLogs';
import { FormStep } from '../../../constants/installation';
import { InstallValues } from '../../../types/redux';

import AwsReadinessForm from './readinessForm';
import AwsSetupForm from './setupForm';

const AWS_FORM_FLOW = {
  [FormStep.AUTHENTICATION]: AwsReadinessForm,
  [FormStep.SETUP]: AwsSetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunningMessage,
};

export const AwsFormFlow: FunctionComponent<FormFlowProps<InstallValues>> = ({
  currentStep,
  ...rest
}) => {
  const ActiveFormStep = AWS_FORM_FLOW[currentStep as FormStep];

  if (!ActiveFormStep) {
    return null;
  }

  return (
    <ActiveFormStep
      {...rest}
      currentStep={currentStep}
      clusterName="kubefirst"
      domainName="kubefirst.dev"
    />
  );
};
