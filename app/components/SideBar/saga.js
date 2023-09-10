import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_SIDEBAR_ITEMS } from './constants';
import { loadDataSuccess } from './actions';
import { API_ENDPOINTS } from '../../containers/constants';

export function* fetchSidebarItems() {
  const response = yield call(request, API_ENDPOINTS.CHAT_INFO, {
    method: 'GET',
  });
  if (response.status === 1) {
    yield put(loadDataSuccess(response.data));
  }
}

export default function* watchLoadSidebar() {
  yield takeLatest(LOAD_SIDEBAR_ITEMS, fetchSidebarItems);
}
