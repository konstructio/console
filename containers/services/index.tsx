import React, { FunctionComponent, useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

import Service from '../service';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import {
  getClusterServices,
  getGitOpsCatalogApps,
  sendTelemetryEvent,
} from '../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DOCS_LINK } from '../../constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';
import Button from '../../components/button';
import { Flow } from '../../components/flow';
import Column from '../../components/column';
import closeImageSrc from '../../assets/close.svg';

import {
  CloseButton,
  ClusterMenu,
  ClusterMenuFooter,
  Container,
  Content,
  FinalFormContainer,
  Form,
  Header,
  LearnMoreLink,
  MenuHeader,
  ServicesContainer,
} from './services.styled';

import FinalForm, { ClusterConfig } from '../clusterForms/finalForm';

enum SERVICES_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const Services: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter();

  const { isEnabled: isGitOpsCatalogEnabled } = useFeatureFlag('gitops-catalog');

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
        dispatch(sendTelemetryEvent({ event }));
      }
    },
    [dispatch, isTelemetryDisabled],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getGitOpsCatalogApps());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCluster?.clusterName) {
      dispatch(() => {
        dispatch(getClusterServices({ clusterName: selectedCluster?.clusterName }));
      });
    }
  }, [dispatch, router, selectedCluster?.clusterName]);

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

  const nodeRef = useRef<HTMLDivElement>(null);

  const methods = useForm<ClusterConfig>();

  return (
    <Container>
      {isGitOpsCatalogEnabled ? (
        <>
          <Header>
            <Box sx={{ width: 'fit-content', marginLeft: '39px' }}>
              <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
                <Tab
                  color={activeTab === SERVICES_TABS.LIST_VIEW ? BISCAY : SALTBOX_BLUE}
                  label={<Typography variant="buttonSmall">List view</Typography>}
                  {...a11yProps(SERVICES_TABS.LIST_VIEW)}
                  sx={{ textTransform: 'initial', mr: 3 }}
                />

                <Tab
                  color={activeTab === SERVICES_TABS.GRAPH_VIEW ? BISCAY : SALTBOX_BLUE}
                  label={<Typography variant="buttonSmall">Graph view</Typography>}
                  {...a11yProps(SERVICES_TABS.GRAPH_VIEW)}
                  sx={{ textTransform: 'initial' }}
                />
              </Tabs>
            </Box>
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: '24px' }}
              onClick={() => setShowPanel(!showPanel)}
            >
              Add workload cluster
            </Button>
          </Header>
          <CSSTransition
            nodeRef={nodeRef}
            in={showPanel}
            timeout={500}
            classNames="cluster-menu"
            unmountOnExit
          >
            <ClusterMenu ref={nodeRef}>
              <MenuHeader>
                <Typography variant="subtitle2">Create workload cluster</Typography>
                <CloseButton onClick={() => setShowPanel(false)}>
                  <Image src={closeImageSrc} height={24} width={24} alt="close" />
                </CloseButton>
              </MenuHeader>
              <Column style={{ flex: 1 }}>
                <FormProvider {...methods}>
                  <Form
                    onSubmit={methods.handleSubmit((values) =>
                      console.log('the form values =>', values),
                    )}
                  >
                    <FinalFormContainer>
                      <FinalForm />
                    </FinalFormContainer>
                    <ClusterMenuFooter>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowPanel(false)}
                      >
                        Close
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Create cluster
                      </Button>
                    </ClusterMenuFooter>
                  </Form>
                </FormProvider>
              </Column>
            </ClusterMenu>
          </CSSTransition>
          <Content>
            <TabPanel value={activeTab} index={SERVICES_TABS.LIST_VIEW}>
              {services}
            </TabPanel>
            <TabPanel value={activeTab} index={SERVICES_TABS.GRAPH_VIEW}>
              <Flow />
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
