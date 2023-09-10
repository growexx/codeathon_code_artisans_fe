import {
  GET_CHAT_HISTORY,
  ADD_CHAT_QUESTION,
  SET_CHAT_HISTORY,
  ADD_CHAT_ANSWER,
} from './constants';

export const getChatHistory = () => ({
  type: GET_CHAT_HISTORY,
});

export const addChatQuestion = (chatId, question) => ({
  type: ADD_CHAT_QUESTION,
  chatId,
  question,
});

export const addChatAnswer = (chatId, answer, sources) => ({
  type: ADD_CHAT_ANSWER,
  chatId,
  answer,
  sources,
});

export const setChatHistory = (chatId, history) => ({
  type: SET_CHAT_HISTORY,
  chatId,
  history,
});
