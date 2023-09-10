import * as types from '../constants';
import reducer, { initialState } from '../reducer';
const getFormJsStateInstance = config =>
  Object.assign(
    {
      email: '',
      password: '',
      loading: false,
      error: false,
      success: false,
    },
    config,
  );
describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_EMAIL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMAIL,
        email: 'email',
      }),
    ).toEqual(getFormJsStateInstance({ email: 'email' }));
  });
  it('should handle CHANGE_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PASSWORD,
        password: 'password',
      }),
    ).toEqual(getFormJsStateInstance({ password: 'password' }));
  });
  it('should handle LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.LOADING,
        loading: true,
      }),
    ).toEqual(getFormJsStateInstance({ loading: true }));
  });
  it('should handle ERROR', () => {
    expect(
      reducer(initialState, {
        type: types.ERROR,
        error: true,
      }),
    ).toEqual(getFormJsStateInstance({ error: true }));
  });
  it('should handle SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.SUCCESS,
        success: true,
      }),
    ).toEqual(getFormJsStateInstance({ success: true }));
  });
  it('should handle RESET', () => {
    expect(
      reducer(initialState, {
        type: types.RESET,
        reset: true,
      }),
    ).toEqual(getFormJsStateInstance(initialState));
  });
});
