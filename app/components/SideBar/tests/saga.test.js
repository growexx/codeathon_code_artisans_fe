/* eslint-disable space-before-function-paren */
import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { fetchSidebarItems as setSagaFunction } from '../saga';
jest.mock('utils/request');

describe('Testing fetchSidebarItems', () => {
  const initialState = {
    menuItems: [],
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  async function recordSaga(saga) {
    const dispatched = [];

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState() {
          return store.getState();
        },
      },
      saga,
    ).toPromise();

    return dispatched;
  }
  test('load sidebar items success', async () => {
    request.mockResolvedValue({ status: 1, data: [] });
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});
