import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Typography from '../components/typography';
import NotFoundIcon from '../assets/404.svg';
import Button from '../components/button/Button';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  text-align: center;
  margin: 24px 0;
  width: 340px;
`;

const NotFound: FunctionComponent = () => {
  const { push } = useRouter();

  const goHomePage = () => {
    push('/services');
  };

  return (
    <Container>
      <Image alt="not-found" src={NotFoundIcon} style={{ marginBottom: 40 }} />
      <Typography variant="h4">Page not found</Typography>
      <Description variant="body2">
        The page you are trying to access is unavailable, has been deleted or doesn’t exist.
      </Description>
      <Button color="primary" variant="contained" onClick={goHomePage}>
        <Typography variant="buttonSmall">Back to homepage</Typography>
      </Button>
    </Container>
  );
};

export default NotFound;
