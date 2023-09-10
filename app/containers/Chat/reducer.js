/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  ADD_CHAT_ANSWER,
  ADD_CHAT_QUESTION,
  SET_CHAT_HISTORY,
} from './constants';

export const initialState = {
  chatHistory: {},
};

const sidebarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_CHAT_QUESTION:
        if (draft.chatHistory[action.chatId]) {
          draft.chatHistory[action.chatId].push({
            question: action.question,
          });
        } else {
          draft.chatHistory[action.chatId] = [
            {
              question: action.question,
            },
          ];
        }
        break;
      case ADD_CHAT_ANSWER:
        const { length } = draft.chatHistory[action.chatId];
        draft.chatHistory[action.chatId][length - 1] = {
          ...draft.chatHistory[action.chatId][length - 1],
          answer: action.answer,
          sources: action.sources,
        };
        break;
      case SET_CHAT_HISTORY:
        draft.chatHistory[action.chatId] = action.history;
        break;
      default:
        return state;
    }
  });

export default sidebarReducer;
