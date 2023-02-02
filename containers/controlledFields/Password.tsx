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
  onErrorText?: string;
  onBlur?: (value: string) => void;
}

const ControlledPassword: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  rules,
  helperText,
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
      render={({ field, fieldState: { error } }) => (
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
          error={isBlur && error !== undefined}
          helperText={isBlur && error !== undefined ? onErrorText || helperText : helperText}
        />
      )}
    />
  );
};

export default ControlledPassword;
