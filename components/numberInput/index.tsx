import React, { FunctionComponent, ComponentPropsWithoutRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import removeIconSrc from '../../assets/remove.svg';
import addIconSrc from '../../assets/add.svg';

import { Root, NumInput, InputContainer, LabelContainer } from './numberInput.styled';

interface NumberInputProps extends ComponentPropsWithoutRef<'label'> {
  label?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({
  onIncrease,
  onDecrease,
  label,
  inputProps,
  ...rest
}) => {
  return (
    <Root {...rest}>
      <LabelContainer>
        {label}
        {inputProps.required && <span>*</span>}
      </LabelContainer>
      <InputContainer>
        <button type="button" onClick={onDecrease}>
          <Image src={removeIconSrc} alt="remove" width={20} height={20} />
        </button>
        <NumInput {...inputProps} />
        <button type="button" onClick={onIncrease}>
          <Image src={addIconSrc} alt="add" width={20} height={20} />
        </button>
      </InputContainer>
    </Root>
  );
};

export default styled(NumberInput)``;
