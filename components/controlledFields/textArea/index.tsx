import React from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import TextAreaWithRef from '../../textArea/';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  onErrorText?: string;
}

function ControlledTextArea<T extends FieldValues>({
  label,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextAreaWithRef
          {...field}
          required={props.required}
          label={label}
          error={!!error}
          helperText={error ? props.onErrorText : props.helperText}
        />
      )}
    />
  );
}

export default ControlledTextArea;
