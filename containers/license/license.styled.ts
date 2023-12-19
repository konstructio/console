import { styled } from 'styled-components';

import FormContainerComponent from '@/components/formContainer';

export const FormContainer = styled(FormContainerComponent)<{ hasMargin: boolean }>`
  border-radius: 8px;
  width: auto;

  ${({ hasMargin }) =>
    hasMargin &&
    `
      &:last-child {
        margin-top: 32px;
      }
  `}
`;

export const BottomFormContainer = styled(FormContainer)<{ hasMargin: boolean }>`
  align-items: center;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  & > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

export const UList = styled.ul`
  padding-left: 20px;
`;
