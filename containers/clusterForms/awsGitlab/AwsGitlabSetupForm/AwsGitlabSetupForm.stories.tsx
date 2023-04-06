import React, { useCallback, useRef } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { setAWSGitlabInstallState } from '../../../../redux/slices/installation.slice';
import Column from '../../../../components/Column/Column';
import Button from '../../../../components/Button/Button';
import { AwsClusterValues } from '../../../../types/redux';
import { useAppDispatch } from '../../../../redux/store';

import AwsGitlabSetupForm from './AwsGitlabSetupForm';

export default {
  title: 'Forms/AWSGitlab/AwsGitlabSetupForm',
  component: AwsGitlabSetupForm,
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
    (values: AwsClusterValues) => {
      dispatch(setAWSGitlabInstallState(values));
    },
    [dispatch],
  );

  return (
    <Container>
      <AwsGitlabSetupForm ref={formRef} onFormSubmit={handleFormSubmit} />
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

  ${AwsGitlabSetupForm} {
    width: 70%;
  }
`;
