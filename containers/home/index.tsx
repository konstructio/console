import React from 'react';

import HomeComponent from '../../components/home';

const Home = ({ configCardValues, adminEmail, clusterName, hostedZoneName }: any) => {
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
