import React, { FunctionComponent } from 'react';

import { Container, Step, StepLabel, StepNumber, Success, SuccessText } from './conciseLogs.styled';

const STEPS = [
  'the first step has been completed ',
  'something was installed ',
  'something else was installed ',
  'installed something',
  'did something',
  'fetched ',
  'installed',
  'set up ',
  'completed ',
  'done',
  'installed ',
  'still working away...',
];

const ConciseLogs: FunctionComponent = ({ ...props }) => {
  return (
    <Container>
      {STEPS.map((step, index) => (
        <Step key={index}>
          <>✅</>
          <StepNumber>{`[${index + 1}/${STEPS.length - 1}]`}</StepNumber>
          <StepLabel color="secondary">{step}</StepLabel>
        </Step>
      ))}

      <Success>
        <SuccessText color="#bef264">Success</SuccessText>
        <SuccessText color="secondary">Cluster Provisioned</SuccessText>
      </Success>
    </Container>
  );
};

export default ConciseLogs;
