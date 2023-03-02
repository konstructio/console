import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Divider } from '@mui/material';
import Image from 'next/image';
import { signInGoogle } from 'redux/actions/session.action';
import { useAppDispatch } from 'redux/store';

import ControlledTextField from '../controlledFields/TextField';
import ControlledPassword from '../controlledFields/Password';
import Button from '../../components/button';
import Typography from '../../components/typography';

import { Background, Container, Form, Panel, Title } from './login.styled';

const EMAIL_REGEX = /.+@.+\..+/;

const Login: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <Container>
      <Background>
        <Title variant="h3">Get started with your instant Kubernetes Platforms!</Title>
        <Image alt="k1-ray-image" src="/static/ray.svg" height={280} width={320} />
      </Background>
      <Panel>
        <Form component="form">
          <Image alt="k1-ray-image" src="/static/login-title.svg" height={40} width={160} />

          <Button
            color="inherit"
            sx={{ mb: 6, mt: 8, width: '100%' }}
            fullWidth
            onClick={() => dispatch(signInGoogle()).unwrap()}
          >
            <Image src="/static/google-login.png" alt="google-logo" width={20} height={20} />
            <Typography variant="button" sx={{ ml: 1 }}>
              Log in with Google
            </Typography>
          </Button>
          <Box sx={{ position: 'relative', mb: 2, mt: 2, width: '100%' }}>
            <Divider variant="fullWidth" sx={{ borderColor: 'red', mt: 1 }} absolute>
              OR
            </Divider>
          </Box>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            onErrorText="Invalid email address."
            required
            rules={{
              required: true,
              pattern: EMAIL_REGEX,
            }}
          />
          <ControlledPassword
            control={control}
            name="password"
            rules={{ required: true }}
            required
            label="Password"
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </Form>
      </Panel>
    </Container>
  );
};

export default Login;
