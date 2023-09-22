import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { CreateEnvironmentMenu } from '../../createEnvironmentMenu';
import Modal from '../../modal';
import useModal from '../../../hooks/useModal';
import { ClusterEnvironment } from '../../../types/provision';

import ControlledEnvironmentSelect from './index';

const meta: Meta<typeof ControlledEnvironmentSelect> = {
  component: ControlledEnvironmentSelect,
};

export default meta;

const previouslyCreatedEnvironment: ClusterEnvironment = {
  environmentName: 'development',
  description: 'Environment for development',
  labelColor: 'dark-sky-blue',
};

const ControlledEnvironmentSelectWithHooks = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const [environments, setEnvironments] = useState<ClusterEnvironment[]>([
    previouslyCreatedEnvironment,
  ]);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<{ environment: ClusterEnvironment }>({
    mode: 'onBlur',
  });

  const handleAddEnvironment = (environment: ClusterEnvironment) => {
    setEnvironments((curState) => [...curState, environment]);
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
          previouslyCreatedEnvironments={environments}
        />
      </Modal>
    </>
  );
};

export const Default: StoryObj<typeof ControlledEnvironmentSelect> = {
  render: () => <ControlledEnvironmentSelectWithHooks />,
};
