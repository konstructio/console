import styled from 'styled-components';

import Typography from '../../components/typography';

export const Container = styled.div`
  font-family: 'Roboto Mono';
  max-height: 450px;
`;

export const EstimatedTime = styled.div`
  margin-bottom: 16px;
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
  font-family: 'Roboto Mono';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
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
