import React, { FunctionComponent } from 'react';

import ClusterManagement, { ClusterManagementProps } from '../containers/clusterManagement';

const ClusterManagementPage: FunctionComponent<ClusterManagementProps> = (props) => (
  <ClusterManagement {...props} />
);

export async function getServerSideProps() {
  const { API_URL = '', USE_TELEMETRY = '' } = process.env;

  return {
    props: {
      apiUrl: API_URL,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
}

export default ClusterManagementPage;
