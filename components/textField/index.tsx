import React, { FunctionComponent } from 'react';
import { FormHelperText, InputLabel, InputProps, InputBase, styled } from '@mui/material';

import Typography from '../typography';

import { Container, Required } from './textField.styled';

export interface TextFieldProps extends InputProps {
  label: string;
  helperText?: string;
}

export const Input = styled(InputBase)(({ theme, error }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : '#ced4da'}`,
    'fontSize': 14,
    'height': 18,
    'line-height': 20,
    'letter-spacing': 0.25,
    'padding': '8px 12px',
    'width': '100%',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  required,
  error,
  disabled,
  helperText,
  endAdornment,
  ...props
}) => {
  return (
    <Container isDisabled={disabled}>
      <InputLabel disabled={disabled}>
        <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
          {label} {required && <Required>*</Required>}
        </Typography>
      </InputLabel>
      <Input
        {...props}
        required={required}
        error={error}
        disabled={disabled}
        size="small"
        endAdornment={endAdornment}
        sx={{ marginBottom: helperText ? 0 : 3 }}
      />
      {helperText && (
        <FormHelperText disabled={disabled} error={error} sx={{ marginBottom: 3 }}>
          {helperText}
        </FormHelperText>
      )}
    </Container>
  );
};

export default TextField;
