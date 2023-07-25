import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../../components/button';
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

  & input {
    width: 100px;
  }
`;

const Template: ComponentStory<typeof Modal> = (props) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open modal
      </Button>
      <Wrapper>
        <Modal {...props} isOpen={isOpen} onCloseModal={closeModal}>
          <Content>
            <span>This is a modal</span>
          </Content>
        </Modal>
      </Wrapper>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
