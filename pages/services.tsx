import React, { FunctionComponent } from 'react';

import Services from '../containers/services';

interface ServicesPageProps {
  domainName: string;
  k3dDomain: string;
  kubefirstVersion: string;
  useTelemetry: boolean;
}

const ServicesPage: FunctionComponent<ServicesPageProps> = (props) => <Services {...props} />;

export async function getServerSideProps() {
  const {
    DOMAIN_NAME = '',
    K3D_DOMAIN = '',
    KUBEFIRST_VERSION = '',
    USE_TELEMETRY = '',
  } = process.env;

  return {
    props: {
      domainName: DOMAIN_NAME,
      k3dDomain: K3D_DOMAIN,
      kubefirstVersion: KUBEFIRST_VERSION,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ServicesPage;
