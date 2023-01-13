import React, { FunctionComponent } from 'react';
import { FormHelperText, InputLabel, InputProps, OutlinedInput } from '@mui/material';

import { Container, Required } from './textField.styled';
export interface TextFieldProps extends InputProps {
  label: string;
  helperText: string;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  required,
  error,
  disabled,
  helperText,
  ...props
}) => {
  return (
    <Container>
      <InputLabel error={error} disabled={disabled}>
        {label} {required && <Required />}
      </InputLabel>
      <OutlinedInput
        {...props}
        required={required}
        error={error}
        disabled={disabled}
        size="small"
        sx={{ height: '36px' }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Container>
  );
};

export default TextField;
