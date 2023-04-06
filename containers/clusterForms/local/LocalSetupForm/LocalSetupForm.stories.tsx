import React, { useCallback, useRef } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Column from '../../../../components/Column/Column';
import Button from '../../../../components/Button/Button';
import { useAppDispatch } from '../../../../redux/store';
import { LocalInstallValues } from '../../../../types/redux';
import { setLocalInstallState } from '../../../../redux/slices/installation.slice';

import { LocalSetupForm } from './LocalSetupForm';

export default {
  title: 'Forms/Local/LocalSetupForm',
  component: LocalSetupForm,
};

const DefaultTemplate: Story = () => {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmission = useCallback(() => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = useCallback(
    (data: LocalInstallValues) => {
      dispatch(setLocalInstallState(data));
    },
    [dispatch],
  );

  return (
    <Container>
      <LocalSetupForm ref={formRef} onFormSubmit={handleFormSubmit} />
      <Button color="primary" variant="contained" onClick={handleFormSubmission}>
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
