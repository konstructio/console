import React, { useState } from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import Password from '../password/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  error?: boolean;
  onErrorText?: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

function ControlledPassword<T extends FieldValues>({
  label,
  name,
  required,
  rules,
  helperText,
  error,
  onErrorText,
  onBlur,
  onChange,
  ...props
}: ControlledTextFieldProps<T>) {
  const [isBlur, setIsBlur] = useState(false);

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
          onChange={(event) => {
            field.onChange(event);
            onChange && onChange(event.target.value);
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
}

export default ControlledPassword;
