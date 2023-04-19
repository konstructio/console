import React from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Select from '../select/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ value: string; label: string }>;
}

function ControlledSelect<T extends FieldValues>({
  label,
  name,
  required,
  rules,
  options,
  ...rest
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          inputRef={field.ref}
          fullWidth
          label={label}
          error={error !== undefined}
          required={required}
          options={options}
        />
      )}
    />
  );
}

export default ControlledSelect;
