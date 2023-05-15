import React, { FunctionComponent } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import Typography from '../typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import { Container, Header } from './errorBanner.styled';

export interface ErrorBannerProps {
  details?: string;
  text: string;
}

const ErrorBanner: FunctionComponent<ErrorBannerProps> = ({ text }) => {
  return (
    <Container>
      <Header>
        <ErrorIcon color="error" fontSize="small" />
        <Typography variant="body2" color={VOLCANIC_SAND}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
      </Header>
    </Container>
  );
};

export default ErrorBanner;
