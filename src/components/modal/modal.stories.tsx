import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import useModal from '../../hooks/useModal';

import Modal from './index';

export default {
  title: 'Overlay/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Content = styled.div`
  height: 400px;
  width: 100%;
`;

const Template: ComponentStory<typeof Modal> = (props) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <input type="button" value="Open modal" onClick={openModal} />
      <Wrapper>
        <Modal {...props} isModalVisible={isOpen}>
          <Content>
            <Modal.Header onCloseModal={closeModal}>
              <span>This is a modal</span>
            </Modal.Header>
          </Content>
        </Modal>
      </Wrapper>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  isFullHeight: true,
};
