/**
 * Login selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectEmail = () =>
  createSelector(
    selectLogin,
    loginState => loginState.email,
  );
const makeSelectPassword = () =>
  createSelector(
    selectLogin,
    loginState => loginState.password,
  );
const makeSelectError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.error,
  );
const makeSelectLoading = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loading,
  );
const makeSelectSuccess = () =>
  createSelector(
    selectLogin,
    loginState => loginState.success,
  );

export {
  selectLogin,
  makeSelectEmail,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
  makeSelectSuccess,
};
