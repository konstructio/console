import React, { FunctionComponent } from 'react';
import { ButtonProps } from '@mui/material';

import { Container, PrimaryButton, SecondaryButton, ErrorButton } from './button.styled';

const BUTTONS_MAP = {
  ['primary']: PrimaryButton,
  ['secondary']: SecondaryButton,
  ['error']: ErrorButton,
};
const Button: FunctionComponent<ButtonProps> = ({ variant, color, disabled, ...rest }) => {
  const StyledButton = BUTTONS_MAP[color as string];
  return (
    <Container disabled={disabled}>
      <StyledButton variant={variant} disabled={disabled} {...rest} />
    </Container>
  );
};

export default Button;
