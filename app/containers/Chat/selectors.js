import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = state => state.chat || initialState;

const selectChatHistory = () =>
  createSelector(
    selectData,
    dataState => dataState.chatHistory,
  );

export { selectChatHistory, selectData };
