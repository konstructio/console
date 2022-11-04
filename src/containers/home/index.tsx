import React from 'react';

import { useAppSelector } from '../../hooks';
import {
  selectConfigAdminEmail,
  selectConfigCardValues,
  selectConfigClusterName,
  selectHostedZoneName,
} from '../../selectors/config.selector';
import HomeComponent from '../../components/home';

const Home = () => {
  const configCardValues = useAppSelector(selectConfigCardValues());
  const adminEmail = useAppSelector(selectConfigAdminEmail());
  const clusterName = useAppSelector(selectConfigClusterName());
  const hostedZoneName = useAppSelector(selectHostedZoneName());

  return (
    <HomeComponent
      adminEmail={adminEmail}
      clusterName={clusterName}
      cards={configCardValues}
      hostedZoneName={hostedZoneName}
    />
  );
};

export default Home;
