import React, { FunctionComponent } from 'react';
import { Box, Divider } from '@mui/material';
import Image from 'next/image';
import { Control } from 'react-hook-form';

import Modal from '../modal';
import Button from '../button';
import Typography from '../typography';
import ControlledPassword from '../controlledFields/Password';
import { GitOpsCatalogApp } from '../../types/gitOpsCatalog';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';

import { Content, Close, Footer, Header } from './gitopsAppModal.styled';

export interface GitopsAppModalProps extends GitOpsCatalogApp {
  control: Control;
  isOpen: boolean;
  isValid: boolean;
  closeModal: () => void;
  onSubmit: (app: GitOpsCatalogApp) => void;
}

const GitopsAppModal: FunctionComponent<GitopsAppModalProps> = ({
  control,
  closeModal,
  isOpen,
  isValid,
  name,
  image_url,
  secret_keys,
  onSubmit,
  ...rest
}) => {
  const handleSubmit = () => {
    onSubmit({ name, image_url, secret_keys, ...rest });
  };

  return (
    <Modal isOpen={isOpen} padding={0}>
      <Box
        sx={{
          width: '630px',
          height: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(100, 116, 139, 0.1)',
        }}
      >
        <Header>
          <Image alt={name} src={image_url} width={30} height={30} />
          <Typography variant="h6" color={BISCAY}>
            {name}
          </Typography>
          <Close onClick={closeModal} htmlColor={SALTBOX_BLUE} fontSize="medium" />
        </Header>
        <Divider />
        <Content>
          {secret_keys &&
            secret_keys.map(({ label, name }) => (
              <ControlledPassword
                key={label}
                control={control}
                name={name}
                label={label}
                rules={{
                  required: true,
                }}
                required
              />
            ))}
        </Content>
        <Divider />
        <Footer>
          <Button variant="text" color="text" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={!isValid} onClick={handleSubmit}>
            Add
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default GitopsAppModal;
