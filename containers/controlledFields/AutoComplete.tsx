import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Autocomplete from '../../components/autocomplete';
export interface ControlledTextFieldProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  loading?: boolean;
  noOptionsText?: string;
  disabled?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOptions?: (options: any[]) => any[];
  onChangeInput?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  options: Array<{ value: string; label: string }>;
}

const ControlledAutocomplete: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  onChangeInput,
  filterOptions,
  options,
  rules,
  disabled,
  placeholder,
  loading,
  ...props
}) => {
  const [isBlur, setIsBlur] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      rules={rules}
      {...props}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
          }}
          loading={loading}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChangeInput={onChangeInput}
          filterOptions={filterOptions}
          options={options}
          label={label}
          error={isBlur && error !== undefined}
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
