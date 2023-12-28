import React, { FunctionComponent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';

import { CloseButton, Footer, Form, FormContent, MenuHeader } from './createRepository.styled';
import CreateRepositoryForm from './createRepositoryForm';

import Typography from '@/components/typography';
import { SALTBOX_BLUE } from '@/constants/colors';
import Button from '@/components/button';
import { Repository } from '@/types/repository';

export interface CreateRepositoryProps {
  onClose: () => void;
  defaultValues?: Repository;
}

const CreateRepository: FunctionComponent<CreateRepositoryProps> = ({ defaultValues, onClose }) => {
  const isLoading = false;

  const methods = useForm<Repository>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = () => {
    console.log('test');
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MenuHeader>
          <Typography variant="subtitle2">Create</Typography>
          <CloseButton onClick={onClose} type="button">
            <CloseIcon htmlColor={SALTBOX_BLUE} />
          </CloseButton>
        </MenuHeader>
        <FormContent>
          <CreateRepositoryForm defaultValues={defaultValues} />
        </FormContent>
        <Footer padding>
          <Footer>
            <Button variant="outlined" color="secondary" onClick={onClose} type="button">
              Close
            </Button>
            <Button variant="contained" color={'primary'} type="submit" disabled={!isValid}>
              {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
              Create
            </Button>
          </Footer>
        </Footer>
      </Form>
    </FormProvider>
  );
};

export default CreateRepository;
