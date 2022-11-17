import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const ProgressContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.beluga};
  border-radius: 5px;
  height: 8px;
  margin-top: 6px;
  width: 100%;
`;

export const ProgressBar = styled.div<{ progress: number; color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  height: 8px;
  width: ${({ progress }) => `${progress}%`};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & > span:last-child {
    color: ${({ color }) => color};
  }
`;
