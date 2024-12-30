import React, { ForwardedRef, FunctionComponent, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AutocompleteMUI, { autocompleteClasses } from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps } from '@mui/system';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import omit from 'lodash/omit';

import TextField from '../TextField/TextField';

import { InputAdornmentContainer } from './Autocomplete.styled';

type AutocompleteOption = { value: unknown; label: string };

export interface IAutocompleteProps extends Omit<ControllerRenderProps<FieldValues>, 'ref'> {
  label: string;
  inputRef?: ForwardedRef<unknown>;
  loading?: boolean;
  noOptionsText?: string;
  options: Array<AutocompleteOption>;
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
  inputRef,
  label,
  loading,
  noOptionsText,
  placeholder,
  options,
  required,
  error,
  sx,
  disabled,
  filterOptions,
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
      popupIcon={<SearchIcon />}
      noOptionsText={noOptionsText}
      filterOptions={filterOptions}
      sx={{ ...sx, [`& .${autocompleteClasses.popupIndicator}`]: { transform: 'none' } }}
      disabled={disabled}
      ListboxProps={{
        style: {
          maxHeight: '210px',
        },
      }}
      {...props}
      ref={inputRef}
      isOptionEqualToValue={(option: AutocompleteOption, value: string) => option.value === value}
      renderInput={(params) => (
        <TextField
          {...omit(params, ['InputLabelProps', 'InputProps'])}
          key={params.id}
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
