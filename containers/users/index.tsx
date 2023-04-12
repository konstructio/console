import React, { FunctionComponent, useState } from 'react';
import { Box } from '@mui/material';

import Typography from '../../components/typography';
import Tab, { TabPanel, Tabs } from '../../components/tab';
import Table from '../../components/table';

import { Container, Content, Description, Header, LearnMoreLink } from './users.styled';

const Users: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const a11yProps = (index: number) => {
    return {
      'id': `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Header>
        <Typography variant="h6">User Management</Typography>
        <Description variant="body2">
          Manage and invite Kubefirst users in one place.{' '}
          <LearnMoreLink href="docs.kubefirst.io" target="_blank">
            Learn more
          </LearnMoreLink>
        </Description>
      </Header>
      <Content>
        <Box sx={{ width: '100%' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Pending Invites" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <Table cols={['Name']} rows={['Cristhian']} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Content>
    </Container>
  );
};

export default Users;
