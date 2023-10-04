import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { CreateEnvironmentMenu } from '../../createEnvironmentMenu';
import Modal from '../../modal';
import useModal from '../../../hooks/useModal';
import { ClusterEnvironment } from '../../../types/provision';
import { EnvCache } from '../../../types/redux';
import { mockEnvironmentsResponse } from '../../../tests/mocks/mockEnvironmentsResponse';
import { mapEnvironmentFromRaw } from '../../../utils/mapEnvironmentFromRaw';

import ControlledEnvironmentSelect from './index';

const meta: Meta<typeof ControlledEnvironmentSelect> = {
  component: ControlledEnvironmentSelect,
};

export default meta;

const mockEnvironments = mockEnvironmentsResponse.map(mapEnvironmentFromRaw);

const ControlledEnvironmentSelectWithHooks = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const [environments, setEnvironments] = useState<ClusterEnvironment[]>(mockEnvironments);
  const [boundEnvs, setBoundEnvs] = useState<EnvCache>(
    mockEnvironments.reduce<Record<string, boolean>>((acc, curVal) => {
      acc[curVal.name] = true;
      return acc;
    }, {}),
  );

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<{ environment: ClusterEnvironment }>({
    mode: 'onBlur',
  });

  const handleAddEnvironment = (environment: ClusterEnvironment) => {
    setEnvironments((curState) => [...curState, environment]);
    setBoundEnvs((curEnvs) => ({ ...curEnvs, [environment.name]: true }));
    setValue('environment', environment);
    closeModal();
  };

  return (
    <>
      <ControlledEnvironmentSelect
        control={control}
        rules={{
          required: 'environment is required',
        }}
        name="environment"
        label="Environment cluster will host"
        required
        onErrorText={errors.environment?.message}
        options={environments}
        onAddNewEnvironment={openModal}
      />
      <Modal
        padding={0}
        isOpen={isOpen}
        styleOverrides={{ width: '100%', maxWidth: '630px' }}
        onCloseModal={closeModal}
      >
        <CreateEnvironmentMenu
          onSubmit={handleAddEnvironment}
          onClose={closeModal}
          previouslyCreatedEnvironments={boundEnvs}
        />
      </Modal>
    </>
  );
};

export const Default: StoryObj<typeof ControlledEnvironmentSelect> = {
  render: () => <ControlledEnvironmentSelectWithHooks />,
};
