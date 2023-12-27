import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  Container,
  Description,
  Footer,
  Header,
  SubscriptionOptions,
} from './cancelSubscriptionForm.styled';

import Typography from '@/components/typography';
import { SALTBOX_BLUE, VOLCANIC_SAND } from '@/constants/colors';
import ControlledCheckbox from '@/components/controlledFields/checkbox';
import Button from '@/components/button';
import { CancelSubscriptionFields } from '@/types/subscription';
import ControlledTextArea from '@/components/controlledFields/textArea';
import { Required } from '@/components/textField/textField.styled';

const CANCEL_SUBSCRIPTION_OPTIONS = [
  {
    name: 'projectIsComplete',
    label: 'The project I was working on is now complete',
  },
  {
    name: 'kubefirstIsTooExpensive',
    label: 'kubefirst is too expensive',
  },
  {
    name: 'kubefirstIsDifficult',
    label: 'kubefirst is too difficult to use',
  },
  {
    name: 'didnotUsePaidPlan',
    label: 'I didn’t use the paid plan features',
  },
  {
    name: 'didnotProviderFunctionality',
    label: 'kubefirst didn’t provide the functionality I needed',
  },
  {
    name: 'other',
    label: 'Other',
  },
];

export interface CancelSubscriptionFormProps {
  closeModal: () => void;
  handleCancelSubscription: () => void;
}

const CancelSubscriptionForm: FunctionComponent<CancelSubscriptionFormProps> = ({
  closeModal,
  handleCancelSubscription,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<CancelSubscriptionFields>();

  const onSubmit = async () => {
    handleCancelSubscription();
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Typography variant="h6">Cancel my subscription</Typography>
        <CloseIcon style={{ margin: 0, color: SALTBOX_BLUE }} onClick={closeModal} />
      </Header>
      <Divider />
      <Typography variant="body2" color={VOLCANIC_SAND} sx={{ m: '32px 24px', display: 'flex' }}>
        Before you go would you mind letting us know why? <Required>*</Required>
      </Typography>
      <SubscriptionOptions>
        {CANCEL_SUBSCRIPTION_OPTIONS.map(({ name, label }) => (
          <ControlledCheckbox
            key={name}
            control={control}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            name={name}
            label={label}
            rules={{
              required: false,
            }}
          />
        ))}
      </SubscriptionOptions>
      <Description>
        <ControlledTextArea
          control={control}
          label="Anything else you’d like to share?"
          name="description"
          minRows={3}
          rules={{
            maxLength: {
              value: 280,
              message: 'Max 280 characters permitted',
            },
          }}
        />
      </Description>
      <Divider />
      <Footer>
        <Button color="secondary" variant="outlined" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="error" variant="contained" type="submit" disabled={!isValid}>
          Cancel subscription
        </Button>
      </Footer>
    </Container>
  );
};

export default CancelSubscriptionForm;
