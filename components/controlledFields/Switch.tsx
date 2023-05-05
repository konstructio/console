import { FormGroup } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Switch from '../switch';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

function ControlledSwitch<T extends FieldValues>({
  name,
  onChange,
  required,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <FormGroup>
          <Switch
            {...field}
            required={required}
            inputRef={field.ref}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          />
        </FormGroup>
      )}
    />
  );
}

export default ControlledSwitch;
