/**
 * Test store addons
 */

import configureStore from '../configureStore';

describe('configureStore', () => {
  let globalStore;

  beforeAll(() => {
    const { store } = configureStore({});
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
      expect(typeof globalStore.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
