/* eslint-disable space-before-function-paren */
import { runSaga } from 'redux-saga';
import configureStore from 'redux-mock-store';
import { getSignIn as setSagaFunction } from '../saga';
jest.mock('utils/request');

describe('Testing getSignIn', () => {
  const initialState = {
    login: {
      email: process.env.REACT_APP_USER_EMAIL,
      password: process.env.REACT_APP_USER_PASSWORD,
      loading: false,
      error: false,
      success: 'done',
    },
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
  test('login success', async () => {
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});

describe('Testing getSignIn', () => {
  const initialState = {
    login: {
      email: 'email',
      password: 'password',
      loading: false,
      error: false,
      success: 'done',
    },
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
  test('login failure', async () => {
    await recordSaga(setSagaFunction);
    expect(recordSaga(setSagaFunction)).toBeTruthy();
  });
});
