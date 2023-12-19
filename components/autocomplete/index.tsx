import React, { ForwardedRef, FunctionComponent, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AutocompleteMUI from '@mui/material/Autocomplete';
import { SxProps } from '@mui/system';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TextField from '../textField';

import { InputAdornmentContainer } from './autocomplete.styled';

export interface IAutocompleteProps extends ControllerRenderProps<FieldValues> {
  label: string;
  inputRef?: ForwardedRef<unknown>;
  loading?: boolean;
  noOptionsText?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  sx?: SxProps;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOptions?: (options: any[]) => any[];
  onClick?: () => void;
}

const AutocompleteComponent: FunctionComponent<IAutocompleteProps> = ({
  label,
  loading,
  noOptionsText,
  placeholder,
  options,
  required,
  error,
  sx,
  filterOptions,
  disabled,
  onClick,
  ...props
}) => {
  // Unfortunately MaterialUI doesn't not update the dom state when no options are available
  const value = useMemo(() => (options.length ? props.value : ''), [options.length, props.value]);

  return (
    <AutocompleteMUI
      loading={loading}
      fullWidth
      options={options}
      popupIcon={<KeyboardArrowDownIcon />}
      noOptionsText={noOptionsText}
      filterOptions={filterOptions}
      sx={sx}
      disabled={disabled}
      ListboxProps={{
        style: {
          maxHeight: '210px',
        },
      }}
      {...props}
      isOptionEqualToValue={(option: string, value: string) => option === value}
      renderInput={(params) => (
        <TextField
          ref={params.InputProps.ref}
          required={required}
          placeholder={placeholder}
          error={error}
          endAdornment={
            <InputAdornmentContainer position="end">
              {loading ? (
                <CircularProgress color="inherit" size={14} />
              ) : (
                params.InputProps.endAdornment
              )}
            </InputAdornmentContainer>
          }
          value={value}
          {...params}
          label={label}
          onClick={onClick}
        />
      )}
    />
  );
};

const Autocomplete = React.forwardRef<unknown, IAutocompleteProps>((props, ref) => {
  return <AutocompleteComponent inputRef={ref} {...props} />;
});

export default Autocomplete;
