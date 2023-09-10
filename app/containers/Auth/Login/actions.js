/*
 * Login Actions
 *
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  ERROR,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  LOADING,
  LOGIN,
  RESET,
  SUCCESS,
} from './constants';

/**
 * Changes the email field
 *
 * @param  {string} email The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_EMAIL
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

/**
 * Changes the password field
 *
 * @param  {string} password The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_PASSWORD
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

/**
 * Changes the error state
 *
 * @param  {string} error : true or false
 *
 * @return {object} An action object with a type of ERROR
 */
export function logInError(error) {
  return {
    type: ERROR,
    error,
  };
}

/**
 * Changes the loading state
 *
 * @param  {string} loading : true or false
 *
 * @return {object} An action object with a type of LOADING
 */
export function changeLoading(loading) {
  return {
    type: LOADING,
    loading,
  };
}

/**
 * Changes the success state
 *
 * @param  {string} success : true or false
 *
 * @return {object} An action object with a type of SUCCESS
 */
export function logInSuccess(success) {
  return {
    type: SUCCESS,
    success,
  };
}

/**
 * log the user, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN
 */
export function fireLogin() {
  return {
    type: LOGIN,
  };
}

/**
 * resets the state
 *
 */
export function resetState() {
  return {
    type: RESET,
  };
}

/**
 * log the user, this action starts the request saga
 *
 * @return {object} An action object with a type of GOOGLE_LOGIN
 */
export function fireGoogleLogin() {
  return {
    type: GOOGLE_LOGIN,
  };
}

/**
 * log the user, this action starts the request saga
 *
 * @return {object} An action object with a type of FACEBOOK_LOGIN
 */
export function fireFacebookLogin() {
  return {
    type: FACEBOOK_LOGIN,
  };
}
