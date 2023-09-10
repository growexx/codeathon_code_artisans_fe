/**
 * Test store addons
 */

import { browserHistory } from 'react-router';
import configureStore from '../configureStore';

describe('configureStore', () => {
  let globalStore;

  beforeAll(() => {
    const { store } = configureStore({}, browserHistory);
    globalStore = store;
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof globalStore.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof globalStore.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof globalStore.runSaga).toEqual('function');
    });
  });
});
