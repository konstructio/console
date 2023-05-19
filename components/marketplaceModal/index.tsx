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
import { useAppDispatch } from '../../redux/store';
import { addMarketplaceApp } from '../../redux/slices/cluster.slice';

import { Content, Close, Footer, Header } from './marketplaceModal.styled';

export interface MarketplaceModalProps extends MarketplaceApp {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (name: string) => void;
}

const MarketplaceModal: FunctionComponent<MarketplaceModalProps> = ({
  closeModal,
  isOpen,
  name,
  image_url,
  secret_keys,
  onSubmit,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { isValid },
  } = useForm();

  const handleSubmit = () => {
    setTimeout(() => {
      dispatch(addMarketplaceApp({ name, image_url, secret_keys, ...rest }));
      closeModal();
      onSubmit(name);
    }, 3000);
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
          <Button variant="text" color="info" onClick={closeModal}>
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

export default MarketplaceModal;
