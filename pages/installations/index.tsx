import React from 'react';
import Modal from 'components/modal';
import Button from 'components/button';

import { InstallationsSelection } from '../../containers/installationsSelection';
import useModal from '../../hooks/useModal';

export default function CloudInstallationSelectionPage() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <InstallationsSelection />
      <Button variant="contained" color="primary" onClick={openModal}>
        Play
      </Button>
      {isOpen && (
        <Modal isModalVisible onCloseModal={closeModal}>
          <iframe
            id="i-framed-you"
            title="original-iframe-title"
            src="https://pacman.kubefirst.tv"
            style={{
              width: '600px',
              height: '800px',
            }}
          />
        </Modal>
      )}
    </>
  );
}
