import React, { FC } from 'react';
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

import {
  Card,
  CardInfoHeader,
  CardDescription,
  Code,
  Link,
  LinkContent,
} from './InstallationInfoCard.styled';

interface InstallationInfoCardProps {
  info: InstallationInfo;
}

const InstallationInfoCard: FC<InstallationInfoCardProps> = ({ info, ...rest }) => {
  const { isOpen, open, close } = useToggle(false);
  const { title, description, code, ctaLink, ctaDescription } = info;

  return (
    <Card {...rest}>
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
      <Link
        href={{
          pathname: ctaLink,
        }}
      >
        <LinkContent>
          <Typography variant="tooltip">{ctaDescription}</Typography>
          <LaunchOutlinedIcon fontSize="small" />
        </LinkContent>
      </Link>
    </Card>
  );
};

export default styled(InstallationInfoCard)``;
