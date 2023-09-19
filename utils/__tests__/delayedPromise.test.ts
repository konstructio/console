import { delayedPromise } from '../delayedPromise';
import { mockClusterResponse } from '../../tests/mocks/mockClusterResponse';

describe('utils/delayedPromise', () => {
  it('will return a response of passed type', async () => {
    const response = await delayedPromise(mockClusterResponse);

    expect(response).toEqual(mockClusterResponse);
  });
  it('will fail if passed the option to', async () => {
    expect(delayedPromise(mockClusterResponse, { reject: true })).rejects.toBe('Failed promise');
    expect(
      delayedPromise(mockClusterResponse, { reject: true, rejectResponse: 'Rejected' }),
    ).rejects.toBe('Rejected');
  });
});
