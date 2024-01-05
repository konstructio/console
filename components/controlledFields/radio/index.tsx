import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { Container, InfoIcon } from './radio.styled';

import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import Row from '@/components/row';
import Tooltip from '@/components/tooltip';

export interface ControlledRadioGroupProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  required?: boolean;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: Array<{ label: string; value: string; tooltipInfo?: string }>;
  onChange?: (value: string) => void;
  inLine?: boolean;
}

function ControlledRadioGroup<T extends FieldValues>({
  defaultValue,
  inLine = false,
  name,
  options,
  onChange,
  required,
  ...props
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <RadioGroup
          defaultValue={defaultValue}
          name={name}
          sx={{ display: 'flex', flexDirection: inLine ? 'row' : 'column' }}
        >
          {options.map(({ label, value, tooltipInfo }) => (
            <FormControlLabel
              key={label}
              value={value}
              control={
                <Radio
                  {...field}
                  name={name}
                  required={required}
                  inputRef={field.ref}
                  value={value}
                  onChange={(e) => {
                    onChange && onChange(e.target.value);
                    field.onChange(e);
                  }}
                />
              }
              label={
                <Container>
                  <Typography variant="body2" color={VOLCANIC_SAND}>
                    {label}
                  </Typography>
                  {tooltipInfo && (
                    <Tooltip placement="top" title={tooltipInfo} maxWidth="280px" whiteSpace="wrap">
                      <Row style={{ alignItems: 'center' }}>
                        <InfoIcon />
                      </Row>
                    </Tooltip>
                  )}
                </Container>
              }
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}

export default ControlledRadioGroup;
