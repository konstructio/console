import React, { FunctionComponent } from 'react';
import { Box, Divider } from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import Modal from '../modal';
import Button from '../button';
import Typography from '../typography';
import ControlledPassword from '../controlledFields/Password';
import { MarketplaceApp } from '../../types/marketplace';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';

import { Content, Close, Footer, Header } from './marketplaceModal.styled';

export interface MarketplaceModalProps extends MarketplaceApp {
  isOpen: boolean;
  closeModal: () => void;
}

const MarketplaceModal: FunctionComponent<MarketplaceModalProps> = ({
  closeModal,
  isOpen,
  name,
  image_url,
  secret_keys,
}) => {
  const { control } = useForm();
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
            secret_keys.map((key) => (
              <ControlledPassword
                key={key}
                control={control}
                name={key}
                label={key}
                rules={{
                  required: true,
                }}
                required
              />
            ))}
        </Content>
        <Divider />
        <Footer>
          <Button variant="text" color="info" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default MarketplaceModal;
