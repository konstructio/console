import { FormControlLabel, FormGroup } from '@mui/material';
import Typography from 'components/typography/index';
import React, { FunctionComponent } from 'react';
import { Control, Controller } from 'react-hook-form';

import Checkbox from '../../components/checkbox';

export interface ControlledTextFieldProps {
  label: string;
  name: string;
  required?: boolean;
  control: Control;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

const ControlledCheckbox: FunctionComponent<ControlledTextFieldProps> = ({
  label,
  name,
  required,
  ...props
}) => {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...field} required={required} inputRef={field.ref} />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        </FormGroup>
      )}
    />
  );
};

export default ControlledCheckbox;
