import React, { FunctionComponent } from 'react';

import Provision, { ProvisionProps } from '../containers/provision';

const ProvisionPage: FunctionComponent<ProvisionProps> = ({ apiUrl, useTelemetry }) => {
  return <Provision apiUrl={apiUrl} useTelemetry={useTelemetry} />;
};

export async function getServerSideProps() {
  const { API_URL = '', USE_TELEMETRY = '' } = process.env;

  return {
    props: {
      apiUrl: API_URL,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ProvisionPage;
