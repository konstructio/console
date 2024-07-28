import React, { useState } from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { SxProps } from '@mui/material';

import Autocomplete from '../../Autocomplete/Autocomplete';

export interface ControlledAutocompleteProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  rules: { required: boolean; pattern?: RegExp };
  loading?: boolean;
  noOptionsText?: string;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps;
  options: Array<{ value: string; label: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOptions?: (options: any[]) => any[];
  onChange?: (value: string) => void;
  onClick?: () => void;
}

function ControlledAutocomplete<T extends FieldValues>({
  label,
  name,
  required,
  options,
  rules,
  disabled,
  placeholder,
  loading,
  sx,
  onChange,
  filterOptions,
  onClick,
  ...delegated
}: ControlledAutocompleteProps<T>) {
  const [isBlur, setIsBlur] = useState(false);

  return (
    <Controller
      name={name}
      rules={rules}
      {...delegated}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={options.length > 0 ? field.value : null}
          loading={loading}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          filterOptions={filterOptions}
          options={options}
          label={label}
          error={isBlur && error !== undefined}
          sx={sx}
          onClick={onClick}
          onChange={(_, optionValue) => {
            const { value } = optionValue || {};
            field.onChange({ target: { value } });
            onChange && onChange(value);
          }}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
          }}
        />
      )}
    />
  );
}

export default ControlledAutocomplete;
