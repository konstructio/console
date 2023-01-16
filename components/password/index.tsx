import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SxProps,
} from '@mui/material';

export interface PasswordProps {
  error?: boolean;
  helperText?: string;
  label: string;
  sx?: SxProps;
}

const Password: FunctionComponent<PasswordProps> = ({ error, helperText, label, sx, ...rest }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl size="small" variant="outlined" sx={sx}>
      <InputLabel htmlFor="outlined-adornment-password" error={error}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...rest}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Password;
