import React, { FunctionComponent, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ContactUsForm from './contactUsForm';

import { CancelSubscriptionFields, UserRequest } from '@/types/subscription';
import Modal from '@/components/modal';
import { useAppDispatch } from '@/redux/store';
import { createUserRequest, validateLicenseKey } from '@/redux/thunks/subscription.thunk';
import { createNotification } from '@/redux/slices/notifications.slice';

export interface ContactUsProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ContactUs: FunctionComponent<ContactUsProps> = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch();

  const methods = useForm<CancelSubscriptionFields>({
    mode: 'onChange',
  });

  const handleContactUsRequest = useCallback(
    (userRequest: UserRequest) => {
      dispatch(createUserRequest(userRequest)).then(() => {
        dispatch(validateLicenseKey());
        closeModal();
        dispatch(
          createNotification({
            message: 'Your message is on it’s way',
            type: 'success',
            snackBarOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          }),
        );
      });
    },
    [closeModal, dispatch],
  );

  return (
    <Modal isOpen={isOpen} padding={0}>
      <FormProvider {...methods}>
        <ContactUsForm closeModal={closeModal} handleContactUsRequest={handleContactUsRequest} />
      </FormProvider>
    </Modal>
  );
};

export default ContactUs;
