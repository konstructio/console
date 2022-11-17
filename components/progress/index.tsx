import React, { FunctionComponent } from 'react';

import { SIZES, TYPES } from '../../enums/typography';
import Text from '../text';

import { Container, ProgressContainer, ProgressBar, ProgressHeader } from './progress.styled';

const { BODY } = TYPES;
export interface IProgressProps {
  color: string;
  progress: number;
  label: string;
}

const Progress: FunctionComponent<IProgressProps> = ({ color, progress, label }) => (
  <Container data-testid="progress">
    <ProgressHeader color={color}>
      <Text type={BODY} size={SIZES.S1}>
        {label}
      </Text>
      <Text type={BODY}>{`${progress / 10}/10`}</Text>
    </ProgressHeader>
    <ProgressContainer>
      <ProgressBar progress={progress} color={color} />
    </ProgressContainer>
  </Container>
);

export default Progress;
