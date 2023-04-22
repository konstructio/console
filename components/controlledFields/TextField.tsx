import React, { useState } from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import TextFieldWithRef from '../textField/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  onErrorText?: string;
}

function ControlledTextField<T extends FieldValues>({
  label,
  required,
  helperText,
  onErrorText,
  ...props
}: ControlledTextFieldProps<T>) {
  const [isBlur, setIsBlur] = useState(false);

  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextFieldWithRef
          {...field}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
          }}
          inputRef={field.ref}
          fullWidth
          required={required}
          label={label}
          error={isBlur && error !== undefined}
          helperText={helperText || (isBlur && error !== undefined) ? onErrorText : undefined}
        />
      )}
    />
  );
}

export default ControlledTextField;
