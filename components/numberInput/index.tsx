import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import removeIconSrc from '../../assets/remove.svg';
import addIconSrc from '../../assets/add.svg';

import { Root, NumInput } from './numberInput.styled';

interface NumberInputProps extends ComponentPropsWithoutRef<'div'> {
  min?: number;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({
  min = 0,
  value,
  onIncrease,
  onDecrease,
  ...rest
}) => {
  return (
    <Root {...rest}>
      <button onClick={onDecrease}>
        <Image src={removeIconSrc} alt="remove" width={20} height={20} />
      </button>
      <NumInput min={min} value={value} />
      <button>
        <Image src={addIconSrc} alt="add" width={20} height={20} onClick={onIncrease} />
      </button>
    </Root>
  );
};

export default styled(NumberInput)``;
