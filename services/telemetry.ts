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
      analytics.identify({
        userId: CLUSTER_ID,
      });

      analytics.track({
        userId: CLUSTER_ID,
        event,
        properties: {
          cli_version: KUBEFIRST_VERSION,
          cloud_provider: CLOUD,
          cluster_id: CLUSTER_ID,
          cluster_type: CLUSTER_TYPE,
          domain: DOMAIN_NAME,
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
