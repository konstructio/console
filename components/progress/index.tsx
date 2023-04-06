import React, { FunctionComponent } from 'react';
import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  stepLabelClasses,
  StepLabel,
  Stepper,
  styled as muiStyled,
} from '@mui/material';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';

import Typography from '../typography';
import themeST from '../../theme';

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

export default styled(Progress)``;

const Label = muiStyled(StepLabel)(() => ({
  [`& .${stepLabelClasses.label}`]: {
    color: '#334155',
  },
  [`& .${stepLabelClasses.disabled}`]: {
    color: themeST.colors.saltboxBlue,
  },
}));

const ColorlibConnector = muiStyled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: 'calc(-50% + 26px)',
    right: 'calc(50% + 26px)',
    top: 25,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: '#424867',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = muiStyled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: 'transparent',
  border: '2px solid #424867',
  zIndex: 1,
  color: themeST.colors.saltboxBlue,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }),
  ...(ownerState.completed && {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: 'transparent',
    color: '#fff',
  }),
}));

const CompletedStep = muiStyled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${theme.palette.primary.main}`,
  zIndex: 1,
  color: themeST.colors.saltboxBlue,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.childOfLight};
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 25px 0;
`;
