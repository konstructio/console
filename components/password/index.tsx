import React, { FunctionComponent, MouseEvent, useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, InputProps } from '@mui/material';

import TextField from '../textField';

import { InputAdornmentContainer } from './password.styled';

export interface PasswordProps extends InputProps {
  label: string;
  helperText?: string;
}

const Password: FunctionComponent<PasswordProps> = ({ label, helperText, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...props}
      label={label}
      helperText={helperText}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornmentContainer position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            disableRipple
          >
            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
          </IconButton>
        </InputAdornmentContainer>
      }
    />
  );
};

export const PasswordWithRef = React.forwardRef<unknown, PasswordProps>((props, ref) => {
  return <Password inputRef={ref} {...props} />;
});

export default PasswordWithRef;
