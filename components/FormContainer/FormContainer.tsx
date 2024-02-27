'use client';
import React, { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

import { Container, FormContent } from './FormContainer.styled';

interface FormContainerProps extends ComponentPropsWithoutRef<'div'> {
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

const FormContainer: FunctionComponent<FormContainerProps> = ({
  children,
  footerContent,
  headerContent,
  ...rest
}) => (
  <Container {...rest}>
    {headerContent}
    <FormContent>{children}</FormContent>
    {footerContent}
  </Container>
);

export default styled(FormContainer)<FormContainerProps>``;
