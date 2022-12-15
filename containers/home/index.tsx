import React from 'react';

import { useAppSelector } from '../../redux/store';
import { selectIsLocal, selectIsTelemetryEnabled } from '../../redux/selectors/config.selector';
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
  const isLocal = useAppSelector(selectIsLocal());

  const onClickLink = (url: string, serviceName: string) => {
    if (isTelemetryEnabled) {
      const event = `console.${serviceName.toLowerCase()}.link`.replace(/ /g, '');
      sendTrackEvent({ event, properties: { url, type: 'link' } });
    }
  };

  const onClickTag = (url: string, serviceName: string) => {
    if (isTelemetryEnabled) {
      const event = `console.${serviceName.toLowerCase()}.tag`.replace(/ /g, '');
      sendTrackEvent({ event, properties: { url, type: 'tag' } });
    }
  };

  return (
    <HomeComponent
      adminEmail={adminEmail}
      clusterName={clusterName}
      cards={configCardValues}
      hostedZoneName={hostedZoneName}
      isLocal={isLocal}
      onClickLink={onClickLink}
      onClickTag={onClickTag}
    />
  );
};

export default Home;
