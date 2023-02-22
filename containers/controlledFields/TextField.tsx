import React, { FunctionComponent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import TextFieldWithRef from '../../components/textField';
export interface ControlledTextFieldProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  rules: Partial<{
    required: boolean;
    pattern: RegExp;
    maxLength: number;
    minLength: number;
  }>;
  helperText?: string;
  onErrorText?: string;
}

const ControlledTextField: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  rules,
  helperText,
  onErrorText,
  ...props
}) => {
  const [isBlur, setIsBlur] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      rules={rules}
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextFieldWithRef
          {...field}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
          }}
          inputRef={field.ref}
          fullWidth
          required={required}
          label={label}
          error={isBlur && error !== undefined}
          helperText={helperText || (isBlur && error !== undefined) ? onErrorText : undefined}
        />
      )}
    />
  );
};

export default ControlledTextField;
