const path = require('path');

const NextServer = require('next/dist/server/next-server').default;
const defaultNextConfig = require('next/dist/server/config-shared').defaultConfig;
const Analytics = require('analytics-node');
process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const nextConfig = require('./next.config');

const { HEARTBEAT_PERIOD_MINUTES } = process.env;

const http = require('http');

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));

let handler;

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('internal server error');
  }
});
const currentPort = parseInt(process.env.PORT, 10) || 3000;

const ANALYTICS_ID = '0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M';

function sendHeartbeat() {
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
        event: 'kubefirst.console.healthz',
        properties: {
          cli_version: KUBEFIRST_VERSION,
          domain: userId,
        },
      });
    }
  } catch (error) {
    console.log('error sending hearbeat event', error);
  }
}

setInterval(sendHeartbeat, (HEARTBEAT_PERIOD_MINUTES || 20) * 60 * 1000);

server.listen(currentPort, (err) => {
  if (err) {
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

  console.log('Kubefirst is Ready on port', currentPort);
});
