import { Box } from '@mui/system';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Container = styled.div`
  align-items: flex-start;
  background: #1e293b;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px;
  position: relative;
  height: 551px;
  width: 1024px;
`;

export const TabContainer = styled(Box)`
  background: #0f172a;
  border-radius: 4px;
  height: calc(100% - 122px);
  padding: 16px;
  width: calc(100% - 32px);
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
    height: 400px;
    padding: 16px;
  }

  & .xterm-helper-textarea {
    display: none;
  }
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 10px;
  right: 10px;
`;

export const ShareInTwitter = styled(TwitterIcon)`
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 10px;
`;
