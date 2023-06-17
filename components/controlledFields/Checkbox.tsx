import { FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Checkbox from '../checkbox/index';
import Typography from '../typography/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

function ControlledCheckbox<T extends FieldValues>({
  label,
  name,
  required,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...field} required={required} inputRef={field.ref} />}
            label={
              <Typography variant="body2" sx={{ ml: 2 }}>
                {label}
              </Typography>
            }
            sx={{ ml: '-2px' }}
          />
        </FormGroup>
      )}
    />
  );
}

export default ControlledCheckbox;
