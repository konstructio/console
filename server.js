/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const http = require('http');

const NextServer = require('next/dist/server/next-server').default;
const defaultNextConfig = require('next/dist/server/config-shared').defaultConfig;
const Analytics = require('analytics-node');
process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const nextConfig = require('./next.config');

const { GIT_PROVIDER, HEARTBEAT_PERIOD_MINUTES } = process.env;

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));

let handler;

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.statusCode = 500;
    res.end('internal server error');
  }
});
const currentPort = parseInt(process.env.PORT, 10) || 3000;

const ANALYTICS_ID = '0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M';

function sendHeartbeat() {
  const {
    CLOUD,
    CLUSTER_ID,
    CLUSTER_TYPE,
    DOMAIN_NAME,
    KUBEFIRST_TEAM,
    KUBEFIRST_VERSION,
    USE_TELEMETRY,
  } = process.env;

  try {
    const isTelemetryEnabled = USE_TELEMETRY === 'true';
    const analytics = new Analytics(ANALYTICS_ID, {
      enable: isTelemetryEnabled,
    });

    if (isTelemetryEnabled) {
      analytics.identify({
        userId: CLUSTER_ID,
      });

      analytics.track({
        userId: CLUSTER_ID,
        event: 'kubefirst.console.healthz',
        properties: {
          cli_version: KUBEFIRST_VERSION,
          cloud_provider: CLOUD,
          cluster_id: CLUSTER_ID,
          cluster_type: CLUSTER_TYPE,
          domain: DOMAIN_NAME,
          git_provider: GIT_PROVIDER,
          kubefirst_team: KUBEFIRST_TEAM,
        },
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error sending hearbeat event', error);
  }
}

sendHeartbeat();
setInterval(sendHeartbeat, (HEARTBEAT_PERIOD_MINUTES || 20) * 60 * 1000);

server.listen(currentPort, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
  const nextServer = new NextServer({
    hostname: 'localhost',
    port: currentPort,
    dir: path.join(__dirname),
    customServer: true,
    dev: false,
    conf: {
      ...defaultNextConfig,
      ...nextConfig,
      distDir: '.next',
      experimental: {
        ...defaultNextConfig.experimental,
        ...nextConfig.experimental,
        serverComponents: true,
      },
    },
  });
  handler = nextServer.getRequestHandler();

  // eslint-disable-next-line no-console
  console.log('Kubefirst is Ready on port', currentPort);
});
