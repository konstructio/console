import { installationReducer, setLocalInstallState, initialState } from '../installation.slice';

describe('redux/slices/installation.slice', () => {
  test('setLocalInstallState works as expected', () => {
    const localPayload = { githubToken: 'token' };

    const updatedState = installationReducer(initialState, setLocalInstallState(localPayload));

    expect(updatedState.local).toStrictEqual(localPayload);
  });
  test('setLocalInstallState will not overwrite existing local state', () => {
    const reduxState = {
      ...initialState,
      local: { ...initialState.local, githubToken: 'token' },
    };

    const localPayload = { gitOpsBranch: 'main' };

    const updatedState = installationReducer(reduxState, setLocalInstallState(localPayload));

    expect(updatedState.local).toStrictEqual({
      githubToken: 'token',
      gitOpsBranch: 'main',
    });
  });
  test('setLocalInstallState will need to be passed undefined value to remove existing local value', () => {
    const reduxState = {
      ...initialState,
      local: { ...initialState.local, githubToken: 'token' },
    };

    const updatedState = installationReducer(
      reduxState,
      setLocalInstallState({ githubToken: undefined }),
    );

    expect(updatedState.local).toEqual({ githubToken: undefined });
  });
});
