import React, { FunctionComponent } from 'react';
import { useHits } from 'react-instantsearch';
import { Box, CircularProgress } from '@mui/material';

import { HitsContainer } from './kubefirstContent.styled';

import ContentHit from '@/components/ContentHit/ContentHit';
import { Content } from '@/types/algolia/content';

const Hits: FunctionComponent = () => {
  const { hits } = useHits<Content>();

  if (!hits.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <HitsContainer>
      {hits.map((hit: Content) => (
        <ContentHit key={hit.id} hit={hit} />
      ))}
    </HitsContainer>
  );
};

export default Hits;
