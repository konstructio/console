import React from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import TextAreaWithRef from '../../textArea/';

export interface ControlledTextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  onErrorText?: string;
  minRows?: string | number;
  textAreaStyleOverrides?: React.CSSProperties;
}

function ControlledTextArea<T extends FieldValues>({
  label,
  ...props
}: ControlledTextAreaProps<T>) {
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
          minRows={props.minRows}
          textAreaStyleOverrides={props.textAreaStyleOverrides}
        />
      )}
    />
  );
}

export default ControlledTextArea;
