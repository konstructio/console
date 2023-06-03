import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../../constants';

export type TelemetryProperties = {
  [key: string]: string;
};

export interface SendTelemetryArgs {
  event: string;
  properties?: TelemetryProperties;
}

export const sendTelemetry = ({ event, properties }: SendTelemetryArgs) => {
  const { CLUSTER_ID, CLUSTER_TYPE, DISABLE_TELEMETRY, KUBEFIRST_VERSION } = process.env;

  const isTelemetryDisabled = DISABLE_TELEMETRY === 'true';
  const analytics = new Analytics(ANALYTICS_ID);

  if (!isTelemetryDisabled) {
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
          cluster_id: CLUSTER_ID,
          cluster_type: CLUSTER_TYPE,
          ...properties,
        },
      });
    } catch (error) {
      // supressing telemetry issues until we move the calls from the healthz
    }
  }
};

export default { sendTelemetry };
