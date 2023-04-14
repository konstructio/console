import React, { useCallback, useRef, useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { setAWSGithubInstallState } from '../../../../redux/slices/installation.slice';
import Column from '../../../../components/column/Column';
import Button from '../../../../components/button/Button';
import { AwsGithubClusterValues } from '../../../../types/redux';
import { useAppDispatch } from '../../../../redux/store';
import { mockGithubUserOrganizations } from '../../../../constants/mockGithubUserOrganizations';

import AwsGithubSetupForm from './AwsGithubSetupForm';

export default {
  title: 'Forms/AWSGithub/AwsGithubSetupForm',
  component: AwsGithubSetupForm,
};

const DefaultTemplate: Story = () => {
  const [githubToken, setGithubToken] = useState('');
  const [githubTokenValid, setGithubTokenValid] = useState(false);

  const dispatch = useAppDispatch();

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

  const handleFormSubmit = useCallback(
    (values: AwsGithubClusterValues) => {
      dispatch(setAWSGithubInstallState(values));
    },
    [dispatch],
  );

  return (
    <Container>
      <AwsGithubSetupForm
        ref={formRef}
        hasTokenValue={!!githubToken}
        githubUserOrginizations={mockGithubUserOrganizations}
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
  justtify-content: center;
`;
