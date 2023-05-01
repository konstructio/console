import React, { FunctionComponent } from 'react';
import {
  InputBase,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  SelectProps,
  styled,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Typography from '../typography';
import { Required } from '../textField/textField.styled';
import { DOLPHIN, LIGHT_GREY, LINK_WATER } from '../../constants/colors';

import { Container } from './select.styled';

export interface ISelectProps extends SelectProps<string> {
  options: Array<{ value: string | number; label: string }>;
}

const MenuProps = {
  PaperProps: {
    sx: {
      '& .MuiMenu-list': {
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        height: '40px',
        padding: '10px 16px',
      },
    },
    style: {
      backgroundColor: 'white',
      color: `${DOLPHIN}`,
      marginTop: '4px',
      border: `1px solid ${LIGHT_GREY}`,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
      borderRadius: '4px',
    },
  },
};

export const Input = styled(InputBase)(({ theme, error }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : LINK_WATER}`,
    'fontSize': 14,
    'lineHeight': '20px',
    'letterSpacing': '0.25px',
    'padding': '8px 12px',
    'width': '100%',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const Select: FunctionComponent<ISelectProps> = ({
  label,
  required,
  placeholder,
  options,
  ...props
}) => (
  <Container>
    <InputLabel sx={{ marginBottom: '8px' }}>
      <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
        {label} {required && <Required>*</Required>}
      </Typography>
    </InputLabel>
    <SelectMUI
      {...props}
      IconComponent={KeyboardArrowDownIcon}
      fullWidth
      required={required}
      input={<Input sx={{ height: '36px' }} />}
      MenuProps={MenuProps}
      displayEmpty
      sx={{ mb: '24px', width: '100%' }}
      renderValue={(selected: string) => {
        if (!selected) {
          return (
            <Typography variant="body2" color={DOLPHIN}>
              {placeholder || 'Select'}
            </Typography>
          );
        }

        return selected;
      }}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={label} value={value} disableRipple>
          <Typography variant="body2">{label}</Typography>
        </MenuItem>
      ))}
    </SelectMUI>
  </Container>
);

const SelectWithRef = React.forwardRef<unknown, ISelectProps>((props, ref) => {
  return <Select inputRef={ref} {...props} />;
});

export default SelectWithRef;
