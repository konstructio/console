import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1e293b;
  border-radius: 4px;
  padding: 60px 16px 16px 16px;
  position: relative;
`;

export const Search = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  position: absolute;
  top: 16px;
  right: 16px;

  & > div > fieldset {
    border-color: transparent !important;
  }

  & > svg {
    cursor: pointer;
  }
`;

export const TerminalView = styled.div`
  & > div {
    border-radius: 4px;
    padding: 16px;
  }
`;
