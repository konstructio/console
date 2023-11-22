import { styled } from 'styled-components';

import FormContainerComponent from '@/components/formContainer';
import Column from '@/components/column';

export const Container = styled(Column)`
  margin: 40px;
`;

export const FormContainer = styled(FormContainerComponent)`
  border-radius: 8px 8px 0 0;
  width: auto;
`;

export const BottomFormContainer = styled(FormContainer)`
  align-items: center;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: auto;
`;

export const PlansContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  height: 100%;
`;
