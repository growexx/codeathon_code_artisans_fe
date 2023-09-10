/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Login container!',
  },
  accountDetails: {
    id: `${scope}.accountDetails.message`,
    defaultMessage: 'Login',
  },
  emailLogin: {
    id: `${scope}.emailLogin.message`,
    defaultMessage: 'Please login to continue',
  },
  signIn: {
    id: `${scope}.signIn.message`,
    defaultMessage: 'SIGN IN',
  },
  notificationToast: {
    id: `${scope}.notification.message`,
    defaultMessage: 'Invalid Credentials!',
  },
  emailRequiredMessage: {
    id: `${scope}.emailRequiredMessage.message`,
    defaultMessage: 'Please input your E-mail!',
  },
  validEmail: {
    id: `${scope}.valid.message`,
    defaultMessage: 'The input is not valid E-mail!',
  },
  passwordRequiredMessage: {
    id: `${scope}.passwordRequiredMessage.message`,
    defaultMessage: 'Please input your password!',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword.message`,
    defaultMessage: 'Forgot Password ?',
  },
});
