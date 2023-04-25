import React, { FunctionComponent } from 'react';

import Button from '../button';

import { Container } from './installationButtons.styled';

export interface InstallationButtonsProps {
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
}

const InstallationButtons: FunctionComponent<InstallationButtonsProps> = ({
  showBackButton,
  onBackButtonClick,
  onNextButtonClick,
  nextButtonText = 'Next',
  nextButtonDisabled,
  ...rest
}) => (
  <Container {...rest}>
    {showBackButton && (
      <Button variant="outlined" color="primary" onClick={onBackButtonClick}>
        Back
      </Button>
    )}

    <Button
      variant="contained"
      color="primary"
      onClick={onNextButtonClick}
      id="next"
      disabled={nextButtonDisabled}
    >
      {nextButtonText}
    </Button>
  </Container>
);

export default InstallationButtons;
