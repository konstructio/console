import React, { FunctionComponent } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';

import ContentHit from '../../components/contentHit';
import { Content } from '../../types/algolia/content';

import { HitsContainer } from './kubefirstContent.styled';

const Hits: FunctionComponent = () => {
  const { hits } = useHits<Content>();

  return (
    <HitsContainer>
      {hits.map((hit: Content) => (
        <ContentHit key={hit.id} hit={hit} />
      ))}
    </HitsContainer>
  );
};

export default Hits;
