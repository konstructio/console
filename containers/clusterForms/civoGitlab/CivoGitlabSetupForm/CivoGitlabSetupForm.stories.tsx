import React, { useCallback, useRef } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { setCivoGitlabInstallState } from '../../../../redux/slices/installation.slice';
import Column from '../../../../components/column/Column';
import Button from '../../../../components/button/Button';
import { CivoClusterValues } from '../../../../types/redux';
import { useAppDispatch } from '../../../../redux/store';

import CivoGitlabSetupForm from './CivoGitlabSetupForm';

export default {
  title: 'Forms/CivoGitlab/CivoGitlabSetupForm',
  component: CivoGitlabSetupForm,
};

const DefaultTemplate: Story = () => {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = useCallback(
    (values: CivoClusterValues) => {
      dispatch(setCivoGitlabInstallState(values));
    },
    [dispatch],
  );

  return (
    <Container>
      <CivoGitlabSetupForm ref={formRef} onFormSubmit={handleFormSubmit} loading={false} />
      <Button color="primary" variant="contained" onClick={submitForm}>
        Submit
      </Button>
    </Container>
  );
};

export const Default = DefaultTemplate.bind({});

const Container = styled(Column)`
  align-items: center;
  gap: 20px;

  ${CivoGitlabSetupForm} {
    width: 70%;
  }
`;
