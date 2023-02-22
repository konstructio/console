import React, { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';

import Select from '../../components/select';

export interface ControlledTextFieldProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ value: string; label: string }>;
}

const ControlledSelect: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  rules,
  options,
  ...props
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      {...props}
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
};

export default ControlledSelect;
