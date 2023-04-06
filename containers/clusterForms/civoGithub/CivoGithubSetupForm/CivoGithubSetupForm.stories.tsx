import React, { useCallback, useRef, useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { setCivoGithubInstallState } from '../../../../redux/slices/installation.slice';
import Column from '../../../../components/Column/Column';
import Button from '../../../../components/Button/Button';
import { CivoInstallValues } from '../../../../types/redux/index';
import { useAppDispatch } from '../../../../redux/store';

import CivoGithubSetupForm from './CivoGithubSetupForm';

export default {
  title: 'Forms/CivoGithub/CivoGithubSetupForm',
  component: CivoGithubSetupForm,
};

const DefaultTemplate: Story = () => {
  const [githubToken, setGithubToken] = useState('');
  const [githubTokenValid, setGithubTokenValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleGithubTokenBlur = useCallback((token: string) => {
    setGithubToken(token);
    setGithubTokenValid(true);
  }, []);

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = useCallback((values: CivoInstallValues) => {
    console.log('the values =>', values);
  }, []);

  return (
    <Container>
      <CivoGithubSetupForm
        ref={formRef}
        hasTokenValue={!!githubToken}
        githubUserOrginizations={[]}
        onGithubTokenBlur={handleGithubTokenBlur}
        githubTokenValid={githubTokenValid}
        onFormSubmit={handleFormSubmit}
        loading={false}
      />
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

  ${CivoGithubSetupForm} {
    width: 70%;
  }
`;
