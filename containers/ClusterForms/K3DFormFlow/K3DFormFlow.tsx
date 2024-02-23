import React, { FunctionComponent } from 'react';

import ClusterRunningMessage from '../shared/ClusterRunning';
import NoSSRTerminal from '../../TerminalLogs/NoSSRTerminal';

import { K3DSetupForm } from './K3DSetupForm/K3DSetupForm';
import { ContentContainer } from './K3DFormFlow.styled';

import { K3DFormStep } from '@/constants/installation';

const K3D_FORM_FLOW = {
  [K3DFormStep.SETUP]: K3DSetupForm,
  [K3DFormStep.PROVISIONING]: NoSSRTerminal,
  [K3DFormStep.READY]: ClusterRunningMessage,
};

export const K3DFormFlow: FunctionComponent<{ currentStep: K3DFormStep }> = ({ currentStep }) => {
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
