import React from 'react';
import { SxProps } from '@mui/material';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Select from '../Select/Select';

export interface ControlledSelectFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ value: string; label: string }>;
  sx?: SxProps;
  onChange?: (value: string) => void;
}

function ControlledSelect<T extends FieldValues>({
  label,
  name,
  required,
  rules,
  options,
  sx,
  onChange,
  ...rest
}: ControlledSelectFieldProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          inputRef={field.ref}
          inputProps={{
            'aria-label': label,
          }}
          fullWidth
          label={label}
          error={error !== undefined}
          required={required}
          options={options}
          onChange={(optionValue) => {
            field.onChange(optionValue);
            onChange && onChange(optionValue.target.value);
          }}
          sx={sx}
        />
      )}
    />
  );
}

export default ControlledSelect;
