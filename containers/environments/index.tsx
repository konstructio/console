import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
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
import { clearEnvironmentError } from '../../redux/slices/environments.slice';
import { noop } from '../../utils/noop';

const Environments: FunctionComponent = () => {
  const { isOpen, close, open } = useToggle();
  const { isOpen: deleteEnv, close: closeDeleteEnv, open: openDeleteEnv } = useToggle();

  const [selectedEnv, setSelectedEnv] = useState<ClusterEnvironment>();

  const { environments, boundEnvironments, error } = useAppSelector(
    ({ environments }) => environments,
  );
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = useCallback((env: ClusterEnvironment) => {
    setSelectedEnv((curEnv) => (curEnv?.name === env.name ? undefined : env));
  }, []);

  const handleAddEnvironment = useCallback(
    (env: ClusterEnvironment) => {
      dispatch(createEnvironment(env))
        .unwrap()
        .then(() => {
          close();
        })
        .catch(noop);
    },
    [dispatch, close],
  );

  const handleEnvironmentDelete = useCallback(() => {
    if (selectedEnv) {
      dispatch(deleteEnvironment(selectedEnv))
        .unwrap()
        .then(() => {
          setSelectedEnv(undefined);
          closeDeleteEnv();
        })
        .catch(noop);
    }
  }, [selectedEnv, dispatch, closeDeleteEnv]);

  const handleDeleteModal = useCallback(() => {
    setSelectedEnv(undefined);
    close();
  }, [close]);

  const handleErrorClose = useCallback(() => {
    dispatch(clearEnvironmentError());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(clearEnvironmentError());
    close();
  }, [dispatch, close]);

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

      {Object.keys(environments).length ? (
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
        onCloseModal={handleModalClose}
      >
        <CreateEnvironmentMenu
          onSubmit={handleAddEnvironment}
          onClose={close}
          previouslyCreatedEnvironments={environments}
          errorMessage={error}
          onErrorClose={handleErrorClose}
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
