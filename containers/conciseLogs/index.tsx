import React, { FunctionComponent, useMemo } from 'react';

import { CLUSTER_CHECKS } from '../../constants/cluster';
import { useAppSelector } from '../../redux/store';

import { Container, Step, StepLabel, StepNumber, Success, SuccessText } from './conciseLogs.styled';

export interface ConciseLogsProps {
  completedSteps: Array<string>;
}

const ConciseLogs: FunctionComponent<ConciseLogsProps> = ({ completedSteps }) => {
  const { isError, isProvisioned, lastErrorCondition } = useAppSelector(({ cluster }) => ({
    cluster: cluster.selectedCluster,
    isProvisioned: cluster.isProvisioned,
    lastErrorCondition: cluster.lastErrorCondition,
    isError: cluster.isError,
  }));

  const lastStep = useMemo(() => {
    if (completedSteps.length < Object.keys(CLUSTER_CHECKS).length) {
      const nextStep = Object.values(CLUSTER_CHECKS)[completedSteps.length + 1];
      return nextStep;
    }

    return null;
  }, [completedSteps.length]);

  return (
    <Container>
      {completedSteps.map((step, index) => (
        <Step key={index}>
          <>✅</>
          <StepNumber>{`[${index + 1}/${Object.keys(CLUSTER_CHECKS).length - 1}]`}</StepNumber>
          <StepLabel color="secondary">{step}</StepLabel>{' '}
        </Step>
      ))}
      {!isError && lastStep && (
        <Step>
          <>💫</>
          <StepNumber>{`[${completedSteps.length + 1}/${
            Object.keys(CLUSTER_CHECKS).length - 1
          }]`}</StepNumber>
          <StepLabel color="secondary">{lastStep}</StepLabel>{' '}
        </Step>
      )}
      {isError && (
        <Step>
          <>❌</>
          <StepLabel color="secondary">Error: {lastErrorCondition}</StepLabel>
        </Step>
      )}
      {isProvisioned && (
        <Success>
          <SuccessText color="#bef264">Success</SuccessText>
          <SuccessText color="secondary">Cluster Provisioned</SuccessText>
        </Success>
      )}
    </Container>
  );
};

export default ConciseLogs;
