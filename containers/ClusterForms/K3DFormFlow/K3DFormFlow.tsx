import React, { FunctionComponent } from 'react';

import ClusterRunningMessage from '../shared/ClusterRunning';
import TerminalLogs from '../../terminalLogs';

import { K3DSetupForm } from './K3DSetupForm/K3DSetupForm';
import { ContentContainer } from './K3DFormFlow.styled';

import { LocalFormStep } from '@/constants/installation';

const K3D_FORM_FLOW = {
  [LocalFormStep.SETUP]: K3DSetupForm,
  [LocalFormStep.PROVISIONING]: TerminalLogs,
  [LocalFormStep.READY]: ClusterRunningMessage,
};

export const K3DFormFlow: FunctionComponent<{ currentStep: LocalFormStep }> = ({ currentStep }) => {
  const ActiveFormStep = K3D_FORM_FLOW[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return (
    <ContentContainer>
      <ActiveFormStep />
    </ContentContainer>
  );
};
