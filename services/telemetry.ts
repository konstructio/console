import Analytics from 'analytics-node';
import { machineIdSync } from 'node-machine-id';

import { ANALYTICS_ID } from '../enums/telemetry';

type TelemetryProperties = {
  [key: string]: string;
};

export const sendTelemetry = (event: string, properties?: TelemetryProperties) => {
  const analytics = new Analytics(ANALYTICS_ID);

  const userId = process.env.HOSTED_ZONE_NAME || machineIdSync();
  analytics.identify({
    userId: userId,
  });

  analytics.track({
    userId: userId,
    event,
    properties: {
      cli_version: process.env.KUBEFIRST_VERSION,
      domain: userId,
      ...properties,
    },
  });
};

export default { sendTelemetry };
