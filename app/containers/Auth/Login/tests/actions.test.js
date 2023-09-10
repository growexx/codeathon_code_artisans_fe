import * as actions from '../actions';
import * as types from '../constants';

describe('Actions Testing', () => {
  it('should create an action to change email', () => {
    const email = 'abc@xyz.com';
    const expectedAction = {
      type: types.CHANGE_EMAIL,
      email,
    };
    expect(actions.changeEmail(email)).toEqual(expectedAction);
  });
  it('should create an action to change password', () => {
    const password = 'abcxyz';
    const expectedAction = {
      type: types.CHANGE_PASSWORD,
      password,
    };
    expect(actions.changePassword(password)).toEqual(expectedAction);
  });
  it('should create an action to create a login Error', () => {
    const expectedAction = {
      type: types.ERROR,
      error: true,
    };
    expect(actions.logInError(expectedAction.error)).toEqual(expectedAction);
  });
  it('should create an action to change loading state', () => {
    const expectedAction = {
      type: types.LOADING,
      loading: true,
    };
    expect(actions.changeLoading(expectedAction.loading)).toEqual(
      expectedAction,
    );
  });
  it('should create an action to change logIn Success', () => {
    const expectedAction = {
      type: types.SUCCESS,
      success: true,
    };
    expect(actions.logInSuccess(true)).toEqual(expectedAction);
  });
  it('should create an action to fire login', () => {
    const expectedAction = {
      type: types.LOGIN,
    };
    expect(actions.fireLogin()).toEqual(expectedAction);
  });
  it('should create an action to fire google login', () => {
    const expectedAction = {
      type: types.GOOGLE_LOGIN,
    };
    expect(actions.fireGoogleLogin()).toEqual(expectedAction);
  });
  it('should create an action to fire facebook login', () => {
    const expectedAction = {
      type: types.FACEBOOK_LOGIN,
    };
    expect(actions.fireFacebookLogin()).toEqual(expectedAction);
  });
  it('should create an action to change reset', () => {
    const expectedAction = {
      type: types.RESET,
    };
    expect(actions.resetState()).toEqual(expectedAction);
  });
});
