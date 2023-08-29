import React from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import NumberInput, { NumberInputProps } from '../../numberInput';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  disabled?: boolean;
  label: string;
  required?: boolean;
  control: Control<T>;
  numberInputProps?: NumberInputProps['inputProps'];
}

function ControlledNumberInput<T extends FieldValues>({
  label,
  numberInputProps,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <NumberInput label={label} inputProps={numberInputProps} {...field} {...props} />
      )}
    />
  );
}

export default ControlledNumberInput;
