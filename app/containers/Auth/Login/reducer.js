/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  ERROR,
  LOADING,
  RESET,
  SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  email: '',
  password: '',
  loading: false,
  error: false,
  success: false,
};

const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case LOADING:
        draft.loading = action.loading;
        draft.error = false;
        draft.success = false;
        break;
      case ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.success = false;
        break;
      case SUCCESS:
        draft.success = action.success;
        draft.loading = false;
        draft.error = false;
        break;
      case RESET:
        draft.email = '';
        draft.password = '';
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      default:
        return state;
    }
  });

export default loginReducer;
