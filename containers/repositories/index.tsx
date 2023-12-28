import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { StyledDrawer } from '../clusterManagement/clusterManagement.styled';

import { Card, CardContainer, Container, Header, Tag } from './repositories.styled';
import CreateRepository from './createRepository';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getRepositories } from '@/redux/thunks/git.thunk';
import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import Button from '@/components/button';
import useToggle from '@/hooks/useToggle';

const Repositories: FunctionComponent = () => {
  const { isOpen: isFormOpen, open: openForm, close: closeForm } = useToggle();
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { managementCluster, repositories } = useAppSelector(({ api, git }) => ({
    managementCluster: api.managementCluster,
    repositories: git.repositories,
  }));

  const handleRedirect = (name: string) => {
    push(`/dashboard/repositories/${name}`);
  };

  useEffect(() => {
    dispatch(
      getRepositories({
        token: managementCluster?.gitAuth.gitToken as string,
        organization: managementCluster?.gitAuth.gitOwner as string,
      }),
    );
  }, [dispatch, managementCluster]);

  return (
    <Container>
      <Header>
        <Typography variant="h6">Repositories</Typography>
        <Button color="primary" variant="contained" onClick={openForm}>
          Add
        </Button>
      </Header>

      <CardContainer>
        {repositories &&
          repositories.map(({ name, visibility }) => (
            <Card key={name} onClick={() => handleRedirect(name)}>
              <Typography variant="subtitle2" color={VOLCANIC_SAND}>
                {name}
              </Typography>

              <Tag bgColor="gray" text={visibility} />
            </Card>
          ))}
      </CardContainer>
      <StyledDrawer open={isFormOpen} onClose={closeForm} anchor="right">
        <CreateRepository onClose={closeForm} />
      </StyledDrawer>
    </Container>
  );
};

export default Repositories;
