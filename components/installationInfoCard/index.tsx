import React, { FC } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Snackbar } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

import useToggle from '../../hooks/useToggle';
import Typography from '../typography/index';
import { TRUE_BLUE } from '../../constants/colors';
import { InstallationInfo } from '../../types/redux';

import {
  Card,
  CardInfoHeader,
  CardDescription,
  Code,
  Link,
  LinkContent,
} from './installationInfoCard.styled';

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
          <Typography variant="labelLarge">{description}</Typography>
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

export default InstallationInfoCard;
