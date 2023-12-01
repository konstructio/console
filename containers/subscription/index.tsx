'use client';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { FormProvider, useForm } from 'react-hook-form';

import Plans from '../plans';
import License from '../license';

import { Container, PlansContainer } from './subscription.styled';

import TabPanel, { Tab, a11yProps } from '@/components/tab';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Typography from '@/components/typography';
import { setActiveTab } from '@/redux/slices/settings.slice';
import { SettingsTab } from '@/constants/setttings';
import { Product } from '@/types/product';
import { activateLicenseKey, validateLicenseKey } from '@/redux/thunks/subscription.thunk';

interface SubscriptionProps {
  products: Array<Product>;
}

const Subscription: FunctionComponent<SubscriptionProps> = ({ products }) => {
  const dispatch = useAppDispatch();

  const { activeTab, license } = useAppSelector(({ settings, subscription }) => ({
    activeTab: settings.activeTab,
    license: subscription.license,
  }));

  const methods = useForm<{ licenseKey: string }>({
    mode: 'onChange',
    defaultValues: {
      licenseKey: license?.licenseKey || '',
    },
  });

  const handleOnChangeTab = (event: React.SyntheticEvent, tabIndex: number) => {
    dispatch(setActiveTab(tabIndex));
  };

  const handleActivateLicense = (licenseKey: string) => {
    dispatch(activateLicenseKey(licenseKey)).then(() => dispatch(validateLicenseKey()));
  };

  const hasLicenseKey = useMemo<boolean>(() => !!license?.licenseKey, [license?.licenseKey]);

  useEffect(() => {
    if (hasLicenseKey) {
      dispatch(setActiveTab(SettingsTab.LICENSE_KEY));
    }
  }, [dispatch, hasLicenseKey]);

  return (
    <Container>
      <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 3 }}>
        Subscription
      </Typography>
      <>
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
          <FormProvider {...methods}>
            <License handleActivateLicense={handleActivateLicense} />
          </FormProvider>
        </TabPanel>
        <TabPanel value={activeTab} index={SettingsTab.PLANS}>
          <PlansContainer>
            {products.map((product) => (
              <Plans
                key={product.id}
                product={product}
                isActive={license?.plan?.name === product.name}
                onClick={() => console.log(product)}
              />
            ))}
          </PlansContainer>
        </TabPanel>
      </>
    </Container>
  );
};

export default Subscription;
