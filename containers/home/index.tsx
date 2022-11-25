import React from 'react';

import { LINK_CLICK_EVENT, TAG_CLICK_EVENT } from '../../enums/telemetry';
import HomeComponent from '../../components/home';
import { useTrackMutation } from '../../redux/api';

export interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configCardValues: Array<any>;
  adminEmail: string;
  clusterName: string;
  hostedZoneName: string;
}

const Home = ({ configCardValues, adminEmail, clusterName, hostedZoneName }: HomeProps) => {
  const [sendTrackEvent] = useTrackMutation();

  const onClickLink = (url: string) => {
    sendTrackEvent({ event: LINK_CLICK_EVENT, properties: { url, type: 'link' } });
  };

  const onClickTag = (url: string) => {
    sendTrackEvent({ event: TAG_CLICK_EVENT, properties: { url, type: 'tag' } });
  };

  return (
    <HomeComponent
      adminEmail={adminEmail}
      clusterName={clusterName}
      cards={configCardValues}
      hostedZoneName={hostedZoneName}
      onClickLink={onClickLink}
      onClickTag={onClickTag}
    />
  );
};

export default Home;
