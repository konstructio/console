import React, { forwardRef } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { QUARTZ, SPUN_PEARL } from '../../constants/colors';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  return (
    <CheckboxMUI
      {...props}
      inputRef={ref}
      style={{ border: '1px' }}
      icon={
        <CheckBoxOutlineBlankIcon
          sx={{ borderRadius: '4px', color: props.disabled ? `${QUARTZ}` : `${SPUN_PEARL}` }}
        />
      }
      checkedIcon={<CheckBoxIcon />}
      disableRipple
    />
  );
});

export default Checkbox;
