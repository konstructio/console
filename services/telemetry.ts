import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../enums/telemetry';

type TelemetryProperties = {
  [key: string]: string;
};

export const sendTelemetry = (event: string, properties?: TelemetryProperties) => {
  try {
    const {
      CLOUD_PROVIDER,
      CLUSTER_ID,
      CLUSTER_TYPE,
      GIT_PROVIDER,
      HOSTED_ZONE_NAME,
      KUBEFIRST_TEAM,
      KUBEFIRST_VERSION,
      USE_TELEMETRY,
    } = process.env;

    const analytics = new Analytics(ANALYTICS_ID);
    const isTelemetryEnabled = USE_TELEMETRY === 'true';

    if (isTelemetryEnabled) {
      const userId = HOSTED_ZONE_NAME || CLUSTER_ID;
      analytics.identify({
        userId: userId,
      });

      analytics.track({
        userId: userId,
        event,
        properties: {
          cli_version: KUBEFIRST_VERSION,
          cloud_provider: CLOUD_PROVIDER,
          cluster_id: userId,
          cluster_type: CLUSTER_TYPE,
          domain: userId,
          git_provider: GIT_PROVIDER,
          isLocal: !HOSTED_ZONE_NAME,
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
