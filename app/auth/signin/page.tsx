'use client';
import React from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Background, Container, ExternalLink, Form, Header, Panel, Title } from './signin.styled';

import Button from '@/components/button';
import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  return (
    <Container>
      <Background>
        <Header>
          <Title variant="h3">Get started with your instant Kubernetes Platforms!</Title>
          <Image alt="k1-ray-image" src="/static/ray.svg" height={280} width={320} />
        </Header>
        <Typography color="white" variant="labelLarge" sx={{ width: '445px', textAlign: 'center' }}>
          By using the Kubefirst platform, you agree to our{' '}
          <ExternalLink href="https://kubeshop.io/terms-of-service" target="_blank">
            Terms of Service
          </ExternalLink>{' '}
          ,{' '}
          <ExternalLink href="https://kubeshop.io/end-user-license-agreement" target="_blank">
            End User Licence Agreement
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://kubeshop.io/privacy" target="_blank">
            Privacy Policy.
          </ExternalLink>
        </Typography>
      </Background>
      <Panel>
        <Form component="form">
          <Image alt="k1-image" src={'/static/titleDark.svg'} height={40} width={160} id="ray" />
          <Typography variant="subtitle1" color={VOLCANIC_SAND} sx={{ mt: 10, mb: 4 }}>
            Welcome
          </Typography>
          <Typography variant="body2" color={VOLCANIC_SAND} sx={{ textAlign: 'center', mb: 4 }}>
            To log in to your kubefirst platform please use your Vault credentials.
          </Typography>
          <Button
            type="button"
            color="text"
            sx={{ mb: 6, width: '100%', minWidth: '100%' }}
            fullWidth
            onClick={() => {
              signIn('vault', {
                callbackUrl: callbackUrl || location.origin,
              });
            }}
          >
            <Image src="/static/vault.svg" alt="vault-icon" width={20} height={20} />
            <Typography color={VOLCANIC_SAND} sx={{ ml: 1 }}>
              Log in with Vault
            </Typography>
          </Button>
        </Form>
      </Panel>
    </Container>
  );
}
