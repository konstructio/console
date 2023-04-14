import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Column from '../../../components/column/Column';
import Button from '../../../components/button/Button';
import { AwsInstallValues } from '../../../types/redux';

import AwsReadinessForm from './AwsReadinessForm';

export default {
  title: 'Components/AwsReadinessForm',
  component: AwsReadinessForm,
};

const DefaultTemplate: Story = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hostedZoneValid, setHostedZoneValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = useCallback((values: AwsInstallValues) => {
    console.log('the form values =>', values);
  }, []);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  const handleTestButtonClick = useCallback(() => {
    setShowMessage(true);
    setIsValidating(true);
  }, []);

  return (
    <Container>
      <AwsReadinessForm
        ref={formRef}
        onFormSubmit={handleFormSubmit}
        showMessage={showMessage}
        isValidating={isValidating}
        isHostedZoneValid={hostedZoneValid}
        onTestButtonClick={handleTestButtonClick}
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
  gap: 50px;
  padding-top: 50px;

  form {
    width: 70%;
  }
`;
