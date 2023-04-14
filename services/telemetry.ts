import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../constants';

export type TelemetryProperties = {
  [key: string]: string;
};

export interface SendTelemetryArgs {
  event: string;
  properties?: TelemetryProperties;
}

export const sendTelemetry = ({ event, properties }: SendTelemetryArgs) => {
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

  const telemetryEnabled = USE_TELEMETRY === 'true';
  const analytics = new Analytics(ANALYTICS_ID);

  if (telemetryEnabled) {
    try {
      if (!CLUSTER_ID) {
        throw new Error('missing env variable: CLUSTER_ID');
      }

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
    } catch (error) {
      // supressing telemetry issues until we move the calls from the healthz
    }
  }
};

export default { sendTelemetry };
