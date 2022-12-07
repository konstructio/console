import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../enums/telemetry';

type TelemetryProperties = {
  [key: string]: string;
};

export const sendTelemetry = (event: string, properties?: TelemetryProperties) => {
  const analytics = new Analytics(ANALYTICS_ID);
  const isTelemetryEnabled = process.env.USE_TELEMETRY === 'true';

  if (isTelemetryEnabled) {
    const userId = process.env.HOSTED_ZONE_NAME || process.env.MACHINE_ID;
    analytics.identify({
      userId: userId,
    });

    analytics.track({
      userId: userId,
      event,
      properties: {
        isLocal: !process.env.HOSTED_ZONE_NAME,
        cli_version: process.env.KUBEFIRST_VERSION,
        domain: userId,
        ...properties,
      },
    });
  }
};

export default { sendTelemetry };
