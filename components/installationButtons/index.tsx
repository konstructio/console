import React, { FunctionComponent } from 'react';

import Button from '../button';

import { Container } from './installationButtons.styled';

export interface InstallationButtonsProps {
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  showNextButton: boolean;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
}

const InstallationButtons: FunctionComponent<InstallationButtonsProps> = ({
  showBackButton,
  onBackButtonClick,
  showNextButton,
  nextButtonText = 'Next',
  nextButtonDisabled,
  ...rest
}) => (
  <Container {...rest}>
    {showBackButton && (
      <Button variant="outlined" color="secondary" onClick={onBackButtonClick}>
        Back
      </Button>
    )}

    {showNextButton && (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="next"
        disabled={nextButtonDisabled}
      >
        {nextButtonText}
      </Button>
    )}
  </Container>
);

export default InstallationButtons;
