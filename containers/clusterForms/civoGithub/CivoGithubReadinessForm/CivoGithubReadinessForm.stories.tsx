import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Column from '../../../../components/Column/Column';
import Button from '../../../../components/Button/Button';
import { CivoInstallValues } from '../../../../types/redux/index';

import CivoGithubReadinessForm from './CivoGithubReadinessForm';

export default {
  title: 'Forms/CivoGithub/CivoGithubReadinessForm',
  component: CivoGithubReadinessForm,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedDomainValid, setHostedDomainValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = useCallback((values: CivoInstallValues) => {
    console.log('the form values =>', values);
  }, []);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedDomainValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <Container>
      <CivoGithubReadinessForm
        ref={formRef}
        onFormSubmit={handleFormSubmit}
        showMessage={showMessage}
        isValidating={isValidating}
        isHostedDomainValid={hostedDomainValid}
        onTestButtonClick={handleTestButtonClick}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={submitForm}
        disabled={!hostedDomainValid}
      >
        Submit
      </Button>
    </Container>
  );
};

export const Default = DefaultTemplate.bind({});

const Container = styled(Column)`
  align-items: center;
  gap: 50px;
  padding-top: 50px;

  form {
    width: 70%;
  }
`;
