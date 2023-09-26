import React, { FunctionComponent } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { QUARTZ, SPUN_PEARL } from '../../constants/colors';

const Checkbox: FunctionComponent<CheckboxProps> = (props) => (
  <CheckboxMUI
    {...props}
    style={{ border: '1px', padding: 0 }}
    icon={
      <CheckBoxOutlineBlankIcon
        sx={{ borderRadius: '4px', color: props.disabled ? `${QUARTZ}` : `${SPUN_PEARL}` }}
      />
    }
    checkedIcon={<CheckBoxIcon />}
    disableRipple
  />
);

const CheckBoxWithRef = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return <Checkbox inputRef={ref} {...props} />;
});

export default CheckBoxWithRef;
