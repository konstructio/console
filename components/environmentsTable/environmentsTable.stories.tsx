import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { mockEnvironmentsResponse } from '../../tests/mocks/mockEnvironmentsResponse';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setEnvironments } from '../../redux/slices/environments.slice';
import { ClusterEnvironment } from '../../types/provision';
import { noop } from '../../utils/noop';
import { createEnvMap } from '../../utils/createEnvMap';

import EnvironmentsTable from './';

const mockEnvironments = createEnvMap(mockEnvironmentsResponse);

const meta: Meta<typeof EnvironmentsTable> = {
  component: EnvironmentsTable,
};

export default meta;

const EnvironmentsTableWithHooks = () => {
  const [selectedEnv, setSelectedEnv] = useState<ClusterEnvironment>();
  const { environments } = useAppSelector(({ environments }) => environments);

  const dispatch = useAppDispatch();

  const handleMenuButtonClick = (env: ClusterEnvironment) => {
    setSelectedEnv((curEnv) => (curEnv?.name === env.name ? undefined : env));
  };

  useEffect(() => {
    dispatch(setEnvironments(mockEnvironments));
  }, [dispatch]);

  return (
    <EnvironmentsTable
      environments={environments}
      onDeleteEnvironment={noop}
      onMenuButtonClick={handleMenuButtonClick}
      selectedEnvironment={selectedEnv}
      // onEditEnvironment={noop}
    />
  );
};

export const Default: StoryObj<typeof EnvironmentsTable> = {
  render: () => <EnvironmentsTableWithHooks />,
};
