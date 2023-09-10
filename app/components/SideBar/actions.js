import {
  ADD_SIDEBAR_ITEM,
  LOAD_SIDEBAR_ITEMS,
  LOAD_SIDEBAR_ITEMS_SUCCESS,
  REMOVE_SIDEBAR_ITEM,
} from './constants';

export const addSidebarItem = data => ({
  type: ADD_SIDEBAR_ITEM,
  data,
});

export const removeSidebarItem = id => ({
  type: REMOVE_SIDEBAR_ITEM,
  id,
});

export const loadSidebarItems = () => ({
  type: LOAD_SIDEBAR_ITEMS,
});

export const loadDataSuccess = data => ({
  type: LOAD_SIDEBAR_ITEMS_SUCCESS,
  data,
});
