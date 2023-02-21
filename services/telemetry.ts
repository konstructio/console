import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../enums/telemetry';

type TelemetryProperties = {
  [key: string]: string;
};

export const sendTelemetry = (event: string, properties?: TelemetryProperties) => {
  const { HOSTED_ZONE_NAME, KUBEFIRST_VERSION, MACHINE_ID, USE_TELEMETRY } = process.env;

  try {
    const isTelemetryEnabled = USE_TELEMETRY === 'true';
    const analytics = new Analytics(ANALYTICS_ID, {
      enable: isTelemetryEnabled,
    });

    if (isTelemetryEnabled) {
      const userId = HOSTED_ZONE_NAME || MACHINE_ID;
      analytics.identify({
        userId,
      });

      analytics.track({
        userId,
        event,
        properties: {
          cli_version: KUBEFIRST_VERSION,
          domain: userId,
          ...properties,
        },
      });
    }
  } catch (error) {
    // supressing telemetry issues until we move the calls from the healthz
  }
};

export default { sendTelemetry };
