import styled from 'styled-components';

export const InputContainer = styled.div<{ hasIcon: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.gravelFint};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  display: flex;
  justify-content: ${({ hasIcon }) => (hasIcon ? 'space-evenly' : 'initial')};
  width: 100%;

  & svg {
    cursor: pointer;
    color: darkgray;
    font-size: 18px;

    &:hover {
      color: black;
    }
  }
`;

export const InputStyled = styled.input<{ hasIcon: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  display: block;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 0px 5px 10px;
  outline: none;
  width: ${({ hasIcon }) => (hasIcon ? 'calc(100% - 40px)' : 'calc(100% - 20px)')};
`;
