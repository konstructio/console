import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../enums/telemetry';

type TelemetryProperties = {
  [key: string]: string;
};

export const sendTelemetry = (event: string, properties?: TelemetryProperties) => {
  const {
    CLOUD,
    CLUSTER_ID,
    CLUSTER_TYPE,
    DOMAIN_NAME,
    GIT_PROVIDER,
    KUBEFIRST_VERSION,
    KUBEFIRST_TEAM,
    USE_TELEMETRY,
  } = process.env;

  try {
    const analytics = new Analytics(ANALYTICS_ID);
    const isTelemetryEnabled = USE_TELEMETRY === 'true';

    if (isTelemetryEnabled) {
      const userId = DOMAIN_NAME || CLUSTER_ID;
      analytics.identify({
        userId,
      });

      analytics.track({
        userId,
        event,
        properties: {
          cli_version: KUBEFIRST_VERSION,
          cloud_provider: CLOUD,
          cluster_id: userId,
          cluster_type: CLUSTER_TYPE,
          domain: userId,
          git_provider: GIT_PROVIDER,
          kubefirst_team: KUBEFIRST_TEAM,
          ...properties,
        },
      });
    }
  } catch (error) {
    // supressing telemetry issues until we move the calls from the healthz
  }
};

export default { sendTelemetry };
