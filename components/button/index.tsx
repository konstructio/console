import React, { FunctionComponent } from 'react';
import { ButtonProps } from '@mui/material';

import {
  Container,
  PrimaryButton,
  SecondaryButton,
  ErrorButton,
  InheritButton,
} from './button.styled';

const BUTTONS_MAP = {
  ['primary']: PrimaryButton,
  ['secondary']: SecondaryButton,
  ['error']: ErrorButton,
  ['inherit']: InheritButton,
};

export interface IButtonProps extends ButtonProps {
  color: 'primary' | 'secondary' | 'error' | 'inherit';
}

const Button: FunctionComponent<IButtonProps> = ({ variant, color, disabled, ...rest }) => {
  const StyledButton = BUTTONS_MAP[color] || BUTTONS_MAP['primary'];

  return (
    <Container disabled={disabled}>
      <StyledButton variant={variant} disabled={disabled} {...rest} />
    </Container>
  );
};

export default Button;
