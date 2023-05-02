import React, { ChangeEvent, useState } from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import Autocomplete from '../autocomplete/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
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

function ControlledAutocomplete<T extends FieldValues>({
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
}: ControlledTextFieldProps<T>) {
  const [isBlur, setIsBlur] = useState(false);

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
          onChange={(event, { value }) => {
            // console.log({ target: { value: event.target.innerText } }, event, test);
            field.onChange({ target: { value } });
          }}
          onChangeInput={onChangeInput}
          filterOptions={filterOptions}
          options={options}
          label={label}
          error={isBlur && error !== undefined}
        />
      )}
    />
  );
}

export default ControlledAutocomplete;
