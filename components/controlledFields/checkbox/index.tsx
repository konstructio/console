import { FormControlLabel } from '@mui/material';
import React from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Checkbox from '../../checkbox/index';
import Typography from '../../typography/index';

export interface ControlledCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  required?: boolean;
  control: Control<T>;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

function ControlledCheckbox<T extends FieldValues>({
  label,
  control,
  ...rest
}: ControlledCheckboxProps<T>) {
  return (
    <FormControlLabel
      {...rest}
      control={
        <Controller
          {...rest}
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Checkbox onChange={onChange} checked={value} {...field} />
          )}
        />
      }
      label={
        <Typography variant="body2" sx={{ ml: 2 }}>
          {label}
        </Typography>
      }
      sx={{ ml: '-2px' }}
    />
  );
}

export default ControlledCheckbox;
