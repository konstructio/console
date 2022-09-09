import React, { FunctionComponent } from 'react';

import { Backdrop, Close, Container, Content, FragmentContainer } from './modal.styled';

export interface IModalProps {
  children: React.ReactElement;
  isModalVisible: boolean;
  onCloseModal: () => void;
}

export interface IFragmentProps {
  children: React.ReactElement;
}

export const Fragment: FunctionComponent<IFragmentProps> = ({ children }) => (
  <FragmentContainer>{children}</FragmentContainer>
);

const BaseModal: FunctionComponent<IModalProps> = ({ children, isModalVisible, onCloseModal }) => (
  <>
    <Backdrop isModalVisible={isModalVisible} />
    {isModalVisible && (
      <Container>
        <Content>
          {children}
          <Close onClick={onCloseModal} />
        </Content>
      </Container>
    )}
  </>
);

type ModalCompoundComponents = {
  Header: typeof Fragment;
  Body: typeof Fragment;
  Footer: typeof Fragment;
};

type ModalWithCompoundComponents = typeof BaseModal & ModalCompoundComponents;

const Modal = BaseModal as ModalWithCompoundComponents;
Modal.Header = Fragment;
Modal.Body = Fragment;
Modal.Footer = Fragment;

export default Modal;
