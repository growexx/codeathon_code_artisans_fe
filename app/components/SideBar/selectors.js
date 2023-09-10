import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = state => state.sidebar || initialState;

const selectMenuItems = () =>
  createSelector(
    selectData,
    dataState => dataState.menuItems,
  );

const selectError = () =>
  createSelector(
    selectData,
    dataState => dataState.error,
  );

export { selectMenuItems, selectError };
