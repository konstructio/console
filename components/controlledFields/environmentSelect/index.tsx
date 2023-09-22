import React from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { EnvironmentSelectWithRef } from '../../select/';
import { ClusterEnvironment } from '../../../types/provision';

export interface ControlledEnvironmentSelectProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  options: ClusterEnvironment[];
  onAddNewEnvironment: () => void;
  helperText?: string;
  onErrorText?: string;
}

function ControlledEnvironmentSelect<T extends FieldValues>({
  label,
  name,
  required,
  rules,
  options,
  onAddNewEnvironment,
  ...rest
}: ControlledEnvironmentSelectProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <EnvironmentSelectWithRef
          {...field}
          inputRef={field.ref}
          fullWidth
          label={label}
          error={!!error}
          required={required}
          options={options}
          helperText={error ? rest.onErrorText : rest.helperText}
          onAddNewEnvironment={onAddNewEnvironment}
        />
      )}
    />
  );
}

export default ControlledEnvironmentSelect;
