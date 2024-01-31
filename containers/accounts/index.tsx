'use client';
import React, { FunctionComponent } from 'react';

import { Container, Header } from './accounts.styled';

import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import LearnMore from '@/components/learnMore';
import { AccountsTable } from '@/components/accountsTable';

const Accounts: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 1 }}>
          Cloud accounts
        </Typography>
        <LearnMore
          description={
            <Typography variant="body2" color={VOLCANIC_SAND}>
              Add and manage the cloud accounts that host your clusters.
            </Typography>
          }
          linkTitle="Learn more"
          href="https://docs.kubefirst.io/civo/quick-start/cluster-management"
        />
      </Header>

      <AccountsTable
        accounts={[{ name: 'Civo', isEnabled: false }]}
        handleEnableAccount={() => {
          console.log('test');
        }}
      />
    </Container>
  );
};

export default Accounts;
