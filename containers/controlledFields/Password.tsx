import React, { FunctionComponent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Password from '../../components/password';
export interface ControlledTextFieldProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  helperText?: string;
  error?: boolean;
  onErrorText?: string;
  onBlur?: (value: string) => void;
}

const ControlledPassword: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  rules,
  helperText,
  error,
  onErrorText,
  onBlur,
  ...props
}) => {
  const [isBlur, setIsBlur] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      rules={rules}
      {...props}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Password
          {...field}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
            onBlur && onBlur(field.value);
          }}
          inputRef={field.ref}
          fullWidth
          required={required}
          label={label}
          error={(isBlur && fieldError !== undefined) || error}
          helperText={
            (isBlur && fieldError !== undefined) || error ? onErrorText || helperText : helperText
          }
        />
      )}
    />
  );
};

export default ControlledPassword;
