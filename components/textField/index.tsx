import React, { FunctionComponent, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { InputProps } from '@mui/material/Input';
import ErrorIcon from '@mui/icons-material/Error';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

import Typography from '../typography';

import { Container, FormHelperText, InputAdornmentError, Required } from './textField.styled';

export interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
}

export const Input = styled(InputBase)(({ theme, error, type, endAdornment }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : '#ced4da'}`,
    'fontSize': 14,
    'height': 18,
    'lineHeight': 20,
    'letterSpacing': 0.25,
    'padding': type === 'password' || !!endAdornment ? '8px 40px 8px 12px' : '8px 12px',
    'width': '100%',
    '&:focus': {
      border: `1px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`,
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
  const errorIcon = useMemo(
    () =>
      error && (
        <InputAdornmentError position="end">
          <ErrorIcon color="error" fontSize="small" />
        </InputAdornmentError>
      ),
    [error],
  );

  return (
    <Container isDisabled={disabled}>
      {label && (
        <InputLabel disabled={disabled}>
          <Typography
            variant="labelLarge"
            sx={{
              display: 'flex',
              gap: '4px',
              whiteSpace: 'pre-line',
              ...props.sx,
            }}
          >
            {label} {required && <Required>*</Required>}
          </Typography>
        </InputLabel>
      )}
      <Input
        {...props}
        autoComplete="off"
        required={required}
        error={error}
        disabled={disabled}
        size="small"
        endAdornment={error ? errorIcon : endAdornment}
      />
      {helperText && (
        <FormHelperText disabled={disabled} error={error} sx={props.sx}>
          <div dangerouslySetInnerHTML={{ __html: helperText }}></div>
        </FormHelperText>
      )}
    </Container>
  );
};

const TextFieldWithRef = React.forwardRef<unknown, TextFieldProps>((props, ref) => {
  return <TextField inputRef={ref} {...props} />;
});

export default TextFieldWithRef;
