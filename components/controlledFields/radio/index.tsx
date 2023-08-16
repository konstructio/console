import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Typography from '../../typography';
import { VOLCANIC_SAND } from '../../../constants/colors';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  required?: boolean;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ label: string; value: string }>;
}

function ControlledRadio<T extends FieldValues>({
  defaultValue,
  name,
  options,
  required,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <RadioGroup defaultValue={defaultValue} name={name}>
          {options.map(({ label, value }) => (
            <FormControlLabel
              key={label}
              value={value}
              control={
                <Radio
                  {...field}
                  name={name}
                  required={required}
                  inputRef={field.ref}
                  value={value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              }
              label={
                <Typography variant="body2" color={VOLCANIC_SAND}>
                  {label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}

export default ControlledRadio;
