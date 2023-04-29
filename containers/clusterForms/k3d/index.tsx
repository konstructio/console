import React, { FunctionComponent } from 'react';

import ClusterRunningMessage from '../../../components/clusterReady';
import TerminalLogs from '../../terminalLogs';
import { LocalFormStep } from '../../../constants/installation';
import { FormFlowProps } from '../../../types/provision';
import { InstallValues } from '../../../types/redux';

import { LocalSetupForm } from './setupForm';
import { ContentContainer } from './k3d.styled';

const K3D_FORM_FLOW = {
  [LocalFormStep.SETUP]: LocalSetupForm,
  [LocalFormStep.PROVISIONING]: TerminalLogs,
  [LocalFormStep.READY]: ClusterRunningMessage,
};

export const LocalFormFlow: FunctionComponent<FormFlowProps<InstallValues>> = ({
  currentStep,
  ...rest
}) => {
  const ActiveFormStep = K3D_FORM_FLOW[currentStep as LocalFormStep];

  if (!ActiveFormStep) {
    return null;
  }

  return (
    <ContentContainer>
      <ActiveFormStep
        {...rest}
        currentStep={currentStep}
        clusterName="kubefirst"
        domainName="kubefirst.dev"
      />
    </ContentContainer>
  );
};
