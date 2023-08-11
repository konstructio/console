import React, { ChangeEvent } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { noop } from '../../../utils/noop';

export interface ControlledRadioGroupProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ value: string; label: string }>;
}

function ControlledRadioGroup<T extends FieldValues>({
  label,
  name,
  required,
  onChange = noop,
  options,
  ...rest
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      {...rest}
      name={name}
      render={({ field }) => (
        <FormControl>
          <FormLabel id={field.name}>{label}</FormLabel>
          <RadioGroup
            aria-labelledby={field.name}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            aria-required={required}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.label}
                control={<Radio />}
                label={option.label}
                value={option.value}
                sx={{ svg: { height: '20px', width: '20px' }, ml: '8px' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}

export default ControlledRadioGroup;
