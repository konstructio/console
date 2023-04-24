import React, { FunctionComponent } from 'react';
import { Step, StepIconProps, Stepper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import Typography from '../typography';

import {
  CompletedStep,
  ColorlibStepIconRoot,
  Container,
  Label,
  ColorlibConnector,
} from './progress.styled';

export interface ProgressProps {
  activeStep: number;
  steps: Array<string>;
}

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return completed ? (
    <CompletedStep>
      <CheckIcon color="primary" />
    </CompletedStep>
  ) : (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  );
}

const Progress: FunctionComponent<ProgressProps> = ({ activeStep, steps, ...rest }) => (
  <Container {...rest}>
    <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
      {steps.map((label) => (
        <Step key={label} sx={{ width: 130 }}>
          <Label StepIconComponent={ColorlibStepIcon}>
            <Typography variant="subtitle2">{label}</Typography>
          </Label>
        </Step>
      ))}
    </Stepper>
  </Container>
);

export default Progress;
