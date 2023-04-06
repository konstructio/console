import React, { FC } from 'react';
import styled from 'styled-components';

import Row from '../Row/Row';
import Button from '../Button/Button';

export interface InstallationButtonsProps {
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
}

const InstallationButtons: FC<InstallationButtonsProps> = ({
  showBackButton,
  onBackButtonClick,
  onNextButtonClick,
  nextButtonText = 'Next',
  nextButtonDisabled,
  ...rest
}) => (
  <Row {...rest}>
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
  </Row>
);

export default styled(InstallationButtons)`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 16px;
  justify-content: flex-end;
  height: 64px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};

  & button {
    text-transform: capitalize;
  }

  #next {
    margin-right: 80px;
  }
`;
