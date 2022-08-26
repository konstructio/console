import styled from 'styled-components';

import PasswordInput from '../password';
import Text from '../text';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 1px 4px 1px darkgrey;
  display: flex;
  flex-direction: column;
  height: 270px;
  justify-content: space-between;
  padding: 16px;
  width: 410px;
`;
export const CardHeader = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 30px;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Image = styled.img`
  height: 100px;
  margin-right: 16px;
`;

export const Password = styled(PasswordInput)`
  & > div > div {
    border: none;
    justify-content: space-between;
  }

  & input {
    padding-left: 0;
  }
`;

export const PasswordTitle = styled(Text)`
  align-items: center;
  display: flex;
`;

export const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

export const TextHeader = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
`;
