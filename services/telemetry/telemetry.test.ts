import Analytics from 'analytics-node';

import { ANALYTICS_ID } from '../../constants';

import { sendTelemetry } from '.';

jest.mock('analytics-node');
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>;

describe('telemetry', () => {
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('should not send telemetry call when DISABLE_TELEMETRY is false', () => {
    process.env.DISABLE_TELEMETRY = 'false';

    sendTelemetry({ event: 'event1' });

    expect(mockAnalytics).toBeCalledWith(ANALYTICS_ID, { enable: false });
    expect(mockAnalytics.mock.instances[0].identify).not.toHaveBeenCalled();

    expect(mockAnalytics.mock.instances[0].track).not.toHaveBeenCalled();
  });

  test('should send telemetry call when DISABLE_TELEMETRY is true', () => {
    process.env.DISABLE_TELEMETRY = 'true';

    sendTelemetry({ event: 'event1' });

    expect(mockAnalytics).toBeCalledWith(ANALYTICS_ID, { enable: true });
    expect(mockAnalytics.mock.instances[1].identify).toHaveBeenCalled();

    expect(mockAnalytics.mock.instances[1].track).toHaveBeenCalled();
  });
});
