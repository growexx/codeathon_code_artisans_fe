import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import Emitter from 'utils/events';
import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/Auth/Login/selectors';
import { ROUTES } from '../../constants';
import { changeLoading, logInError, resetState } from './actions';
import { LOGIN } from './constants';
import StorageService from '../../../utils/StorageService';
import {
  TOKEN_KEY,
  EMITTER_EVENTS,
  USER_DATA_KEY,
} from '../../../utils/constants';
import { loginSuccessResponse } from './stub/login.stub';

export function* getSignIn() {
  const emailId = yield select(makeSelectEmail());
  const passWord = yield select(makeSelectPassword());
  const userEmail = process.env.REACT_APP_USER_EMAIL;
  const userPassword = process.env.REACT_APP_USER_PASSWORD;
  yield put(changeLoading(true));
  if (emailId.toLowerCase() === userEmail && passWord === userPassword) {
    StorageService.set(TOKEN_KEY, loginSuccessResponse.data.token);
    StorageService.set(USER_DATA_KEY, loginSuccessResponse.data);
    yield put(changeLoading(false));
    yield put(resetState());
    yield put(push(ROUTES.HOME));
    Emitter.emit(EMITTER_EVENTS.LOG_IN);
  } else {
    yield put(changeLoading(false));
    yield put(logInError(true));
  }
}

export default function* login() {
  yield takeLatest(LOGIN, getSignIn);
}
