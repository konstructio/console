import React, { FunctionComponent } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Checkbox: FunctionComponent<CheckboxProps> = ({ disabled, ...props }) => {
  return (
    <CheckboxMUI
      {...props}
      disabled={disabled}
      style={{ border: '1px' }}
      icon={
        <CheckBoxOutlineBlankIcon
          sx={{ borderRadius: '4px', color: disabled ? '#D4D4D8' : '#A1A1AA' }}
        />
      }
      checkedIcon={<CheckBoxIcon />}
      disableRipple
    />
  );
};

export default Checkbox;
