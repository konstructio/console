import React from 'react';

import { useAppSelector } from '../../hooks';
import {
  selectConfigAdminEmail,
  selectConfigCardValues,
  selectHostedZoneName,
} from '../../selectors/config.selector';
import HomeComponent from '../../components/home';

const Home = () => {
  const configValues = useAppSelector(selectConfigCardValues());
  const adminEmail = useAppSelector(selectConfigAdminEmail());
  const hostedZoneName = useAppSelector(selectHostedZoneName());

  return (
    <HomeComponent adminEmail={adminEmail} cards={configValues} hostedZoneName={hostedZoneName} />
  );
};

export default Home;
