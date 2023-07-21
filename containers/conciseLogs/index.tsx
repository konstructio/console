import React, { FunctionComponent, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { Box, CircularProgress } from '@mui/material';

import { CLUSTER_CHECKS } from '../../constants/cluster';
import { useAppSelector } from '../../redux/store';
import { InstallationType } from '../../types/redux';

import {
  Container,
  EstimatedTime,
  Step,
  StepLabel,
  StepNumber,
  Success,
  SuccessText,
} from './conciseLogs.styled';

const ESTIMATED_TIMES_BY_CLOUD: Record<InstallationType, number> = {
  [InstallationType.LOCAL]: 5,
  [InstallationType.AWS]: 35,
  [InstallationType.CIVO]: 10,
  [InstallationType.CIVO_MARKETPLACE]: 10,
  [InstallationType.DIGITAL_OCEAN]: 7,
  [InstallationType.VULTR]: 10,
};
export interface ConciseLogsProps {
  completedSteps: Array<{ label: string; order: number }>;
}

const ConciseLogs: FunctionComponent<ConciseLogsProps> = ({ completedSteps }) => {
  const { installType, isError, isProvisioned, lastErrorCondition } = useAppSelector(
    ({ api, installation }) => ({
      cluster: api.selectedCluster,
      isProvisioned: api.isProvisioned,
      lastErrorCondition: api.lastErrorCondition,
      isError: api.isError,
      installType: installation.installType,
    }),
  );

  const lastStep = useMemo(() => {
    if (completedSteps.length < Object.keys(CLUSTER_CHECKS).length) {
      const nextStep = Object.values(CLUSTER_CHECKS)[completedSteps.length];
      return nextStep;
    }

    return null;
  }, [completedSteps.length]);

  const estimatedTime = useMemo(
    () => ESTIMATED_TIMES_BY_CLOUD[installType as InstallationType],
    [installType],
  );

  return (
    <Container>
      <EstimatedTime>
        <StepLabel color="secondary">⏰ Estimated time: {estimatedTime} minutes</StepLabel>
      </EstimatedTime>
      {sortBy(completedSteps, 'order').map((step, index) => (
        <Step key={index}>
          <>✅</>
          <StepNumber>{`[${index + 1}/${Object.keys(CLUSTER_CHECKS).length}]`}</StepNumber>
          <StepLabel color="secondary">{step.label}</StepLabel>{' '}
        </Step>
      ))}
      {!isError && lastStep && (
        <Step>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress size={15} sx={{ color: '#FFD700' }} />
          </Box>
          <StepNumber>{`[${completedSteps.length + 1}/${
            Object.keys(CLUSTER_CHECKS).length
          }]`}</StepNumber>
          <StepLabel color="secondary">{lastStep.label}</StepLabel>{' '}
        </Step>
      )}
      {!isProvisioned && !lastStep && !isError && (
        <Step>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress size={15} sx={{ color: '#FFD700' }} />
          </Box>
          <StepNumber>{`[${completedSteps.length + 1}/${
            Object.keys(CLUSTER_CHECKS).length + 1
          }]`}</StepNumber>
          <StepLabel color="secondary">Preparing kubefirst console</StepLabel>{' '}
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
          <>🎉</>
          <SuccessText color="#bef264">Success</SuccessText>
          <SuccessText color="secondary">Cluster Provisioned</SuccessText>
        </Success>
      )}
    </Container>
  );
};

export default ConciseLogs;
