import React, { FunctionComponent, InputHTMLAttributes } from 'react';

import { InputContainer, InputIcon, InputStyled } from './input.styled';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  onIconClick?: () => void;
  type: string;
  value: string;
}

const Input: FunctionComponent<IInputProps> = ({ icon, onIconClick, type, value, ...rest }) => (
  <InputContainer hasIcon={!!icon}>
    <InputStyled hasIcon={!!icon} type={type} value={value} {...rest} />
    {icon && <InputIcon alt={value} src={icon} onClick={onIconClick} />}
  </InputContainer>
);

export default Input;
