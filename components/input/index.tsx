import React, { FunctionComponent, InputHTMLAttributes } from 'react';

import { InputContainer, InputStyled } from './input.styled';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  onIconClick?: () => void;
  type: string;
  value: string;
}

const Input: FunctionComponent<IInputProps> = ({
  icon: Icon,
  onIconClick,
  type,
  value,
  ...rest
}) => (
  <InputContainer hasIcon={!!Icon}>
    <InputStyled hasIcon={!!Icon} type={type} value={value} {...rest} />
    {Icon && <Icon onClick={onIconClick} />}
  </InputContainer>
);

export default Input;
