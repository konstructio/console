import React, { FunctionComponent } from 'react';

import Button from '../button';

import { Container } from './installationButtons.styled';

export interface InstallationButtonsProps {
  activeStep: number;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  onNextButtonClick: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
}

const InstallationButtons: FunctionComponent<InstallationButtonsProps> = ({
  activeStep,
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
      type="submit"
      variant="contained"
      color="primary"
      id="next"
      onClick={() => activeStep === 0 && onNextButtonClick()}
      disabled={nextButtonDisabled}
    >
      {nextButtonText}
    </Button>
  </Container>
);

export default InstallationButtons;
