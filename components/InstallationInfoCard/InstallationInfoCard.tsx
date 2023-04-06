import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Snackbar } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

import useToggle from '../../hooks/useToggle';
import Typography from '../typography/index';
import { InstallationInfo } from '../../hooks/useInstallation';
import { TRUE_BLUE } from '../../constants/colors';

interface InstallationInfoCardProps {
  info: InstallationInfo;
}

const InstallationInfoCard: FC<InstallationInfoCardProps> = ({ info, ...rest }) => {
  const { isOpen, open, close } = useToggle(false);
  const { title, description, code, ctaLink, ctaDescription } = info;

  return (
    <CardInfo {...rest}>
      <CardInfoHeader>
        <InfoOutlinedIcon htmlColor={TRUE_BLUE} />
        <Typography variant="subtitle3">{title}</Typography>
      </CardInfoHeader>
      <CardDescription>
        {Array.isArray(description) ? (
          <ol type="1">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        ) : (
          <Typography variant="body2">{description}</Typography>
        )}
      </CardDescription>
      {code && (
        <Code>
          <Typography variant="body2">{code}</Typography>
          <CopyToClipboard text={code} onCopy={open}>
            <ContentCopyOutlinedIcon />
          </CopyToClipboard>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={isOpen}
            autoHideDuration={3000}
            onClose={close}
            message="Copied!"
          />
        </Code>
      )}
      <CardLink
        href={{
          pathname: ctaLink,
        }}
      >
        <>
          <Typography variant="tooltip">{ctaDescription}</Typography>
          <LaunchOutlinedIcon fontSize="small" />
        </>
      </CardLink>
    </CardInfo>
  );
};

export default styled(InstallationInfoCard)``;

export const CardInfo = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-sizing: border-box;
  height: 228px;
  padding: 24px;
  width: 500px;
`;

export const CardInfoHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const CardDescription = styled.div<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  max-width: 394px;
  letter-spacing: 0 !important;

  ${({ isActive }) =>
    isActive &&
    `
    color: #3f3f46;
  
  `}
`;

export const CardLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  gap: 8px;
  margin-top: 24px;
`;

export const Code = styled.div`
  align-items: center;
  background: #f1f5f9;
  border-radius: 4px;
  color: #3f3f46;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-family: Roboto Mono;
  height: 20px;
  padding: 10px 16px;
  margin-top: 16px;
  width: 416px;

  & svg {
    color: #94a3b8;
  }
`;
