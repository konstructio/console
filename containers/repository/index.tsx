import React, { FunctionComponent, useEffect } from 'react';

import { Container } from './repository.styled';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getArgoWorkflowTemplates } from '@/redux/thunks/repository.thunk';

export interface RepositoryProps {
  slug: string;
}

const Repository: FunctionComponent<RepositoryProps> = ({ slug }) => {
  const dispatch = useAppDispatch();
  const argoWorkflowTemplates = useAppSelector(
    ({ repository }) => repository.argoWorkflowTemplates,
  );

  useEffect(() => {
    dispatch(getArgoWorkflowTemplates());
  }, [dispatch]);

  return (
    <Container>
      <h1>Hey {slug}</h1>
    </Container>
  );
};

export default Repository;
