import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import Row from '../../components/row';
import Column from '../../components/column';
import Typography from '../../components/typography';
import LearnMore from '../../components/learnMore';
import Button from '../../components/button';
import compDisplayImage from '../../assets/comp_display.svg';
import useToggle from '../../hooks/useToggle';
import Modal from '../../components/modal';
import { CreateEnvironmentMenu } from '../../components/createEnvironmentMenu';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
} from '../../redux/thunks/environments.thunk';
import EnvironmentsTable from '../../components/environmentsTable';
import { ClusterEnvironment } from '../../types/provision';
import DeleteEnvironment from '../../components/deleteEnvironment';

const Environments: FunctionComponent = () => {
  const { isOpen, close, open } = useToggle();
  const { isOpen: deleteEnv, close: closeDeleteEnv, open: openDeleteEnv } = useToggle();

  const [selectedEnv, setSelectedEnv] = useState<ClusterEnvironment>();

  const { environments, boundEnvironments } = useAppSelector(({ environments }) => environments);
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = (env: ClusterEnvironment) => {
    setSelectedEnv((curEnv) => (curEnv?.name === env.name ? undefined : env));
  };

  const handleAddEnvironment = (env: ClusterEnvironment) => {
    dispatch(createEnvironment(env));
    close();
  };

  const handleEnvironmentDelete = () => {
    if (selectedEnv) {
      dispatch(deleteEnvironment(selectedEnv));
      setSelectedEnv(undefined);
      closeDeleteEnv();
    }
  };

  const handleDeleteModal = () => {
    setSelectedEnv(undefined);
    close();
  };

  useEffect(() => {
    dispatch(getAllEnvironments());
  }, [dispatch]);

  return (
    <Column style={{ width: '100%' }}>
      <Header>
        <HeadingContainer>
          <Typography variant="h6">Environments</Typography>
          <LearnMore
            withoutDivider
            description="Define and add you environments."
            linkTitle="Learn more"
            href=""
          />
        </HeadingContainer>
        <Button variant="contained" color="primary" onClick={open}>
          Create environment
        </Button>
      </Header>

      {environments.length ? (
        <EnvironmentsTable
          // ref={tableRef}
          environments={environments}
          onDeleteEnvironment={openDeleteEnv}
          onMenuButtonClick={handleMenuButtonClick}
          selectedEnvironment={selectedEnv}
          // onEditEnvironment={noop}
        />
      ) : (
        <DisplayContainer>
          <Image src={compDisplayImage} height={147} width={200} alt="computer display" />
          <Typography variant="subtitle2" style={{ marginTop: '20px' }}>
            You don&apos;t have any environments defined
          </Typography>
          <Typography variant="body2">
            Create and add environments for your application development.
          </Typography>
        </DisplayContainer>
      )}
      <Modal
        padding={0}
        isOpen={isOpen}
        styleOverrides={{ width: '100%', maxWidth: '630px' }}
        onCloseModal={close}
      >
        <CreateEnvironmentMenu
          onSubmit={handleAddEnvironment}
          onClose={close}
          previouslyCreatedEnvironments={boundEnvironments}
        />
      </Modal>
      {selectedEnv && (
        <DeleteEnvironment
          isOpen={deleteEnv}
          environment={selectedEnv}
          boundToCluster={boundEnvironments[selectedEnv.name]}
          onClose={handleDeleteModal}
          onCloseModal={handleDeleteModal}
          onDelete={handleEnvironmentDelete}
        />
      )}
    </Column>
  );
};

export default Environments;

const Header = styled(Row)`
  margin: 40px;
  justify-content: space-between;
`;

const HeadingContainer = styled(Column)`
  gap: 8px;
`;

const DisplayContainer = styled(Column)`
  width: 100%;
  align-items: center;
  margin-top: 110px;
  gap: 16px;
`;
