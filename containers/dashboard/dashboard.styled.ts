import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 0px;
  padding: 12px 24px 12px 24px;
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const Card = styled.div<{ isActive: boolean }>`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  width: 500px;
  height: 116px;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  ${({ theme, isActive }) =>
    isActive &&
    `
      border: 2px solid ${theme.colors.primary};
  `}
`;

export const Content = styled.div`
  display: flex;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardDescription = styled.div`
  color: #3f3f46;
  max-width: 394px;
`;

export const CartTitle = styled.div``;
