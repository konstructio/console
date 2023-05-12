import styled from 'styled-components';

import Typography from '../../components/typography';

export const Container = styled.div`
  font-family: 'Roboto Mono';
  max-height: 450px;
  overflow: auto;
`;

export const Step = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const StepNumber = styled(Typography)`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #94a3b8;
`;

export const StepLabel = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export const Success = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const SuccessText = styled(Typography)`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 24px;
`;
