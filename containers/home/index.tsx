import React from 'react';

import { useAppSelector } from '../../redux/store';
import { selectIsTelemetryEnabled } from '../../redux/selectors/config.selector';
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
  const isTelemetryEnabled = useAppSelector(selectIsTelemetryEnabled());

  const onClickLink = (url: string) => {
    if (isTelemetryEnabled) {
      sendTrackEvent({ event: LINK_CLICK_EVENT, properties: { url, type: 'link' } });
    }
  };

  const onClickTag = (url: string) => {
    if (isTelemetryEnabled) {
      sendTrackEvent({ event: TAG_CLICK_EVENT, properties: { url, type: 'tag' } });
    }
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
