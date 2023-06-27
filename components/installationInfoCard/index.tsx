import React, { FunctionComponent } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Snackbar } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

import useToggle from '../../hooks/useToggle';
import Typography from '../typography/index';
import { TRUE_BLUE, VOLCANIC_SAND } from '../../constants/colors';
import { InstallationInfo } from '../../types/redux';
import CivoLogo from '../../assets/civo.svg';

import {
  Card,
  CardInfoHeader,
  CardDescription,
  Code,
  Link,
  LinkContent,
  DescriptionItem,
  Image,
} from './installationInfoCard.styled';

interface InstallationInfoCardProps {
  info: InstallationInfo;
  isCivoMarketplace?: boolean;
}

const InstallationInfoCard: FunctionComponent<InstallationInfoCardProps> = ({
  info,
  isCivoMarketplace = false,
  ...rest
}) => {
  const { isOpen, open, close } = useToggle(false);
  const { title, description, code, ctaLink, ctaDescription } = info;

  return (
    <Card {...rest}>
      {isCivoMarketplace && <Image src={CivoLogo} alt="civo-logo" height={24} width={72} />}
      <CardInfoHeader>
        {!isCivoMarketplace && <InfoOutlinedIcon htmlColor={TRUE_BLUE} />}
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>
          {title}
        </Typography>
      </CardInfoHeader>
      <CardDescription>
        {Array.isArray(description) ? (
          description.map((item, index) => (
            <DescriptionItem key={index}>
              <Typography variant="body2" color={VOLCANIC_SAND}>
                {index + 1}.
              </Typography>
              <Typography variant="body2" color={VOLCANIC_SAND}>
                <div dangerouslySetInnerHTML={{ __html: item }}></div>
              </Typography>
            </DescriptionItem>
          ))
        ) : (
          <Typography variant="labelLarge" color={VOLCANIC_SAND}>
            {description}
          </Typography>
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
      {ctaLink && (
        <Link
          href={{
            pathname: ctaLink,
          }}
          target="_blank"
        >
          <LinkContent>
            <Typography variant="tooltip">{ctaDescription}</Typography>
            <LaunchOutlinedIcon fontSize="small" />
          </LinkContent>
        </Link>
      )}
    </Card>
  );
};

export default InstallationInfoCard;
