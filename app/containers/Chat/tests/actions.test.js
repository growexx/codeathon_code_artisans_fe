import * as actions from '../actions';
import * as types from '../constants';

describe('Actions Testing', () => {
  it('should create an action to get chat history', () => {
    const expectedAction = {
      type: types.GET_CHAT_HISTORY,
    };
    expect(actions.getChatHistory()).toEqual(expectedAction);
  });
  it('should create an action to add chat question', () => {
    const chatId = 'abcxyz';
    const question = 'abcxyz';
    const expectedAction = {
      type: types.ADD_CHAT_QUESTION,
      chatId,
      question,
    };
    expect(actions.addChatQuestion(chatId, question)).toEqual(expectedAction);
  });
  it('should create an action to add chat answer', () => {
    const chatId = 'abcxyz';
    const answer = 'abcxyz';
    const sources = [];
    const expectedAction = {
      type: types.ADD_CHAT_ANSWER,
      chatId,
      answer,
      sources,
    };
    expect(actions.addChatAnswer(chatId, answer, sources)).toEqual(
      expectedAction,
    );
  });
  it('should create an action to set chat history', () => {
    const chatId = 'abcxyz';
    const history = [];
    const expectedAction = {
      type: types.SET_CHAT_HISTORY,
      chatId,
      history,
    };
    expect(actions.setChatHistory(chatId, history)).toEqual(expectedAction);
  });
});
