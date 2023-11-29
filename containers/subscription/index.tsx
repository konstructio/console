'use client';
import React, { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { CircularProgress } from '@mui/material';

import Plans from '../plans';

import {
  BottomFormContainer,
  Container,
  FormContainer,
  PlansContainer,
} from './subscription.styled';

import TabPanel, { Tab, a11yProps } from '@/components/tab';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Button from '@/components/button';
import PasswordWithRef from '@/components/password';
import LearnMore from '@/components/learnMore';
import Typography from '@/components/typography';
import { setActiveTab } from '@/redux/slices/settings.slice';
import { SettingsTab } from '@/constants/setttings';
import { Product } from '@/types/product';
import { activateLicenseKey } from '@/redux/thunks/license.thunk';

interface SubscriptionProps {
  products: Array<Product>;
}

const Subscription: FunctionComponent<SubscriptionProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const licenses = [];

  const { activeTab, isLoading } = useAppSelector(({ settings }) => settings);

  const handleOnChangeTab = (event: React.SyntheticEvent, tabIndex: number) => {
    dispatch(setActiveTab(tabIndex));
  };

  const handleActivateLicense = () => {
    dispatch(activateLicenseKey('0e5ba61e-88b3-11ee-b9d1-0242ac120002'));
  };

  return (
    <Container>
      <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 3 }}>
        Subscription
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleOnChangeTab} indicatorColor="primary">
          <Tab
            color={activeTab === SettingsTab.LICENSE_KEY ? BISCAY : undefined}
            label={<Typography variant="buttonSmall">License key</Typography>}
            {...a11yProps(SettingsTab.LICENSE_KEY)}
            sx={{ textTransform: 'initial', marginRight: '24px' }}
          />
          <Tab
            color={activeTab === SettingsTab.PLANS ? BISCAY : undefined}
            label={<Typography variant="buttonSmall">Plans</Typography>}
            {...a11yProps(SettingsTab.PLANS)}
            sx={{ textTransform: 'initial', marginRight: 0 }}
          />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={SettingsTab.LICENSE_KEY}>
        <FormContainer>
          <PasswordWithRef
            label="License key"
            name="licenseName"
            required
            fullWidth
            data-test-id="license-key"
          />
        </FormContainer>
        <BottomFormContainer>
          <LearnMore
            href="/planes/some-id"
            description="Learn more about"
            linkTitle="your license key"
            withoutDivider
          />
          <Button variant="contained" color="primary" onClick={handleActivateLicense}>
            {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
            Activate
          </Button>
        </BottomFormContainer>
      </TabPanel>
      <TabPanel value={activeTab} index={SettingsTab.PLANS}>
        <PlansContainer>
          {products.map((product, index) => (
            <Plans
              key={product.id}
              product={product}
              isActive={index === 0}
              onClick={() => console.log(product)}
            />
          ))}
        </PlansContainer>
      </TabPanel>
    </Container>
  );
};

export default Subscription;
