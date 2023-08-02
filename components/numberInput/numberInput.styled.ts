import styled from 'styled-components';

import Row from '../row';

export const NumInput = styled.input.attrs({ type: 'number' })`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  width: 100%;
  text-align: end;
  padding-right: 10px;

  border: 1px solid #e4e4e7;
  color: #3f3f46;
`;

export const Root = styled(Row)`
  width: 100%;

  button {
    height: 36px;
    width: 36px;
    border: 1px solid #e4e4e7;
    background-color: white;
    cursor: pointer;

    &:first-child {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
  }
`;
