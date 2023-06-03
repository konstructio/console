import React, { FunctionComponent, useEffect, useCallback, useState, useMemo } from 'react';
import { Box, Tabs } from '@mui/material';
import { useRouter } from 'next/router';

import Service from '../service';
import Marketplace from '../marketplace';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import { useTelemetryMutation } from '../../redux/api';
import { getClusterServices, getMarketplaceApps } from '../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DOCS_LINK } from '../../constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

import { Container, Content, Header, LearnMoreLink, ServicesContainer } from './services.styled';

enum SERVICES_TABS {
  PROVISIONED = 0,
  MARKETPLACE = 1,
}

const Services: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sendTelemetryEvent] = useTelemetryMutation();
  const router = useRouter();

  const { isEnabled: isMarketplaceEnabled } = useFeatureFlag('marketplace');

  const dispatch = useAppDispatch();
  const { clusterServices, isTelemetryDisabled, selectedCluster } = useAppSelector(
    ({ config, cluster }) => ({
      isTelemetryDisabled: config.isTelemetryDisabled,
      clusterServices: cluster.clusterServices,
      selectedCluster: cluster.selectedCluster,
    }),
  );

  const onClickLink = useCallback(
    (url: string, name: string) => {
      if (!isTelemetryDisabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        sendTelemetryEvent({ event, properties: { url, type: 'link' } });
      }
    },
    [isTelemetryDisabled, sendTelemetryEvent],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getMarketplaceApps());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCluster?.clusterName) {
      dispatch(() => {
        dispatch(getClusterServices({ clusterName: selectedCluster?.clusterName }));
      });
    }
  }, [dispatch, router, selectedCluster]);

  const services = useMemo(
    () => (
      <>
        <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
          Click on a link to access the service Kubefirst has provisioned for you.{' '}
          <LearnMoreLink
            href={DOCS_LINK}
            target="_blank"
            onClick={() => onClickLink(DOCS_LINK, 'docs')}
          >
            Learn more
          </LearnMoreLink>
        </Typography>
        <ServicesContainer>
          {clusterServices.map(({ name, ...rest }) => (
            <Service key={name} name={name} {...rest} onClickLink={onClickLink} />
          ))}
        </ServicesContainer>
      </>
    ),
    [clusterServices, onClickLink],
  );

  return (
    <Container>
      <Header>
        <Typography variant="h6">Services Overview</Typography>
      </Header>
      {isMarketplaceEnabled ? (
        <>
          <Box sx={{ width: 'fit-content', mb: 4 }}>
            <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
              <Tab
                color={activeTab === SERVICES_TABS.PROVISIONED ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">Provisioned services</Typography>}
                {...a11yProps(SERVICES_TABS.PROVISIONED)}
                sx={{ textTransform: 'capitalize', mr: 3 }}
              />

              <Tab
                color={activeTab === SERVICES_TABS.MARKETPLACE ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">Marketplace</Typography>}
                {...a11yProps(SERVICES_TABS.MARKETPLACE)}
                sx={{ textTransform: 'capitalize' }}
              />
            </Tabs>
          </Box>
          <Content>
            <TabPanel value={activeTab} index={SERVICES_TABS.PROVISIONED}>
              {services}
            </TabPanel>
            <TabPanel value={activeTab} index={SERVICES_TABS.MARKETPLACE}>
              <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
                Add your favourite applications to your cluster.{' '}
                <LearnMoreLink
                  href={DOCS_LINK}
                  target="_blank"
                  onClick={() => onClickLink(DOCS_LINK, 'docs')}
                >
                  Learn more
                </LearnMoreLink>
              </Typography>
              <Marketplace />
            </TabPanel>
          </Content>
        </>
      ) : (
        services
      )}
    </Container>
  );
};

export default Services;
