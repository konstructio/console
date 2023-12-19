'use client';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Plans from '../plans';
import License from '../license';

import { Container, PlansContainer } from './subscription.styled';

import TabPanel, { Tab, a11yProps } from '@/components/tab';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Typography from '@/components/typography';
import { setActiveTab } from '@/redux/slices/settings.slice';
import { SettingsTab } from '@/constants/setttings';
import { Plan } from '@/types/plan';
import { activateLicenseKey, validateLicenseKey } from '@/redux/thunks/subscription.thunk';

interface SubscriptionProps {
  plans: Array<Plan>;
}

const Subscription: FunctionComponent<SubscriptionProps> = ({ plans }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { activeTab, license, saasURL } = useAppSelector(({ settings, subscription, config }) => ({
    activeTab: settings.activeTab,
    license: subscription.license,
    saasURL: config.saasURL,
  }));

  const methods = useForm<{ licenseKey: string }>({
    mode: 'onChange',
    defaultValues: {
      licenseKey: license?.licenseKey || '',
    },
  });

  const currentPlanIndex = useMemo(
    () => plans.findIndex(({ name }) => name === license?.plan?.name),
    [license, plans],
  );

  const handleOnChangeTab = (event: React.SyntheticEvent, tabIndex: number) => {
    dispatch(setActiveTab(tabIndex));
  };

  const handleActivateLicense = (licenseKey: string) => {
    dispatch(activateLicenseKey(licenseKey)).then(() => dispatch(validateLicenseKey()));
  };

  const handleRedirectToSaas = (plan: string) => {
    push(`${saasURL}?plan=${plan}`);
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
            {plans.map((plan, index) => (
              <Plans
                key={plan.id}
                plan={plan}
                hideButton={currentPlanIndex > index}
                isActive={license?.plan?.name === plan.name}
                onClick={() => handleRedirectToSaas(plan.name)}
              />
            ))}
          </PlansContainer>
        </TabPanel>
      </>
    </Container>
  );
};

export default Subscription;
