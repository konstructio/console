import React, { forwardRef } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  return (
    <CheckboxMUI
      {...props}
      inputRef={ref}
      style={{ border: '1px' }}
      icon={
        <CheckBoxOutlineBlankIcon
          sx={{ borderRadius: '4px', color: props.disabled ? '#D4D4D8' : '#A1A1AA' }}
        />
      }
      checkedIcon={<CheckBoxIcon />}
      disableRipple
    />
  );
});

export default Checkbox;
