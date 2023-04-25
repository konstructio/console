import styled from 'styled-components';

import FormContainer from '../../../components/formContainer';
import Button from '../../../components/button';
import { SPUN_PEARL } from '../../../constants/colors';

export const Form = styled(FormContainer)`
  gap: 20px;

  ${Button} {
    margin-top: 20px;
  }
`;

export const Message = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.volcanicSand};
  gap: 8px;
  margin-top: 24px;

  & > span > svg {
    color: ${SPUN_PEARL};
  }
`;
