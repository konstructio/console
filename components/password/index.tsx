import React, { FunctionComponent, MouseEvent, useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { FormControl, IconButton, InputBase, styled, SxProps } from '@mui/material';

import { InputAdornmentContainer } from './password.styled';

export interface PasswordProps {
  error?: boolean;
  sx?: SxProps;
}

export const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': '1px solid #ced4da',
    'fontSize': 14,
    'height': 18,
    'line-height': 20,
    'letter-spacing': 0.25,
    'padding': '8px 40px 8px 12px',
    'position': 'relative',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const Password: FunctionComponent<PasswordProps> = ({ error, sx, ...rest }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl size="small" sx={sx}>
      <Input
        {...rest}
        type={showPassword ? 'text' : 'password'}
        error={error}
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
    </FormControl>
  );
};

export default Password;
