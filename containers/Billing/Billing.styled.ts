import styled from 'styled-components';

import { WHITE } from '@/constants/colors';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  background-color: ${WHITE};
  border-radius: 8px 8px 0px 0px;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  margin-top: 24px;
`;

export const NoLicenseContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;
