import React, { FunctionComponent } from 'react';
import { ButtonProps } from '@mui/material/Button';

import {
  Container,
  PrimaryButton,
  SecondaryButton,
  SecondaryDarkButton,
  ErrorButton,
  InfoButton,
  TextButton,
} from './button.styled';

const BUTTONS_MAP = {
  ['primary']: PrimaryButton,
  ['secondary']: SecondaryButton,
  ['secondaryDark']: SecondaryDarkButton,
  ['error']: ErrorButton,
  ['info']: InfoButton,
  ['text']: TextButton,
};

export interface IButtonProps extends Omit<ButtonProps, 'key'> {
  color: 'primary' | 'secondary' | 'secondaryDark' | 'error' | 'info' | 'text';
}

const Button: FunctionComponent<IButtonProps> = ({
  variant,
  color,
  disabled,
  fullWidth,
  ...rest
}) => {
  const StyledButton = BUTTONS_MAP[color] || BUTTONS_MAP['primary'];

  return (
    <Container disabled={disabled} fullWidth={fullWidth}>
      <StyledButton
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        {...rest}
        sx={{ textTransform: 'initial', ...rest.sx }}
      />
    </Container>
  );
};

export default Button;
