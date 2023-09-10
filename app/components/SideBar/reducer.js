/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  ADD_SIDEBAR_ITEM,
  LOAD_SIDEBAR_ITEMS_SUCCESS,
  REMOVE_SIDEBAR_ITEM,
} from './constants';

export const initialState = {
  menuItems: [],
};

const sidebarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SIDEBAR_ITEM:
        draft.menuItems.unshift(action.data);
        break;
      case REMOVE_SIDEBAR_ITEM:
        draft.menuItems = draft.menuItems.filter(
          item => item.chatId !== action.id,
        );
        break;
      case LOAD_SIDEBAR_ITEMS_SUCCESS:
        draft.menuItems = action.data;
        break;
      default:
        return state;
    }
  });

export default sidebarReducer;
